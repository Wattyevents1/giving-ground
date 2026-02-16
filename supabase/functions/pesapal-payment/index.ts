import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Pesapal sandbox URLs (test mode)
const PESAPAL_AUTH_URL = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
const PESAPAL_SUBMIT_ORDER_URL = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest";
const PESAPAL_IPN_URL = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";
const PESAPAL_TX_STATUS_URL = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus";

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function getAccessToken(): Promise<string> {
  const consumerKey = Deno.env.get("PESAPAL_CONSUMER_KEY");
  const consumerSecret = Deno.env.get("PESAPAL_CONSUMER_SECRET");

  if (!consumerKey || !consumerSecret) {
    throw new Error("Pesapal credentials not configured");
  }

  const res = await fetchWithTimeout(PESAPAL_AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Pesapal auth failed: ${JSON.stringify(data)}`);
  }
  return data.token;
}

async function registerIPN(token: string, ipnUrl: string): Promise<string> {
  const res = await fetchWithTimeout(PESAPAL_IPN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: "GET",
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`IPN registration failed: ${JSON.stringify(data)}`);
  }
  return data.ipn_id;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // IPN callback handler
    if (action === "ipn") {
      const orderTrackingId = url.searchParams.get("OrderTrackingId");
      const orderMerchantReference = url.searchParams.get("OrderMerchantReference");
      console.log("IPN received:", { orderTrackingId, orderMerchantReference });

      // Check transaction status
      if (orderTrackingId) {
        const token = await getAccessToken();
        const statusRes = await fetchWithTimeout(
          `${PESAPAL_TX_STATUS_URL}?orderTrackingId=${orderTrackingId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const statusData = await statusRes.json();
        console.log("Transaction status:", statusData);

        // Update donation status in database if needed
        if (statusData.payment_status_description === "Completed") {
          const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
          const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
          const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
          const supabase = createClient(supabaseUrl, supabaseKey);

          await supabase
            .from("donations")
            .update({ status: "completed" })
            .eq("transaction_id", orderMerchantReference);
        }
      }

      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Submit order
    if (req.method === "POST") {
      const body = await req.json();
      const { amount, donor_name, donor_email, donor_phone, description, merchant_reference, callback_url, is_recurring, project_id } = body;

      if (!amount || !donor_email) {
        return new Response(
          JSON.stringify({ error: "Amount and email are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const token = await getAccessToken();

      // Get the function URL for IPN
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const ipnCallbackUrl = `${supabaseUrl}/functions/v1/pesapal-payment?action=ipn`;
      const ipnId = await registerIPN(token, ipnCallbackUrl);

      const orderPayload = {
        id: merchant_reference || crypto.randomUUID(),
        currency: "USD",
        amount: Number(amount),
        description: description || "Donation",
        callback_url: callback_url || `${new URL(req.headers.get("origin") || req.url).origin}/`,
        notification_id: ipnId,
        billing_address: {
          email_address: donor_email,
          phone_number: donor_phone || "",
          first_name: donor_name?.split(" ")[0] || "",
          last_name: donor_name?.split(" ").slice(1).join(" ") || "",
        },
      };

      const orderRes = await fetchWithTimeout(PESAPAL_SUBMIT_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || orderData.error) {
        throw new Error(`Order submission failed: ${JSON.stringify(orderData)}`);
      }

      // Save donation record
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase.from("donations").insert({
        amount: Number(amount),
        donor_name: donor_name || null,
        donor_email: donor_email,
        payment_method: "pesapal",
        is_recurring: is_recurring || false,
        status: "pending",
        transaction_id: orderPayload.id,
        project_id: project_id || null,
      });

      return new Response(
        JSON.stringify({
          redirect_url: orderData.redirect_url,
          order_tracking_id: orderData.order_tracking_id,
          merchant_reference: orderPayload.id,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pesapal payment error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
