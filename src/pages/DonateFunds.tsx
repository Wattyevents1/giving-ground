import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Heart, CreditCard, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const presetAmounts = [10, 25, 50, 100, 250, 500];

const DonateFunds = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetClick = (preset: number) => { setSelectedPreset(preset); setAmount(preset); };
  const handleCustomAmount = (value: string) => { setSelectedPreset(null); setAmount(value ? parseInt(value) : ""); };

  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-charity-gold fill-current" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Make a Donation</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Your generosity changes lives. Every contribution, no matter the size, brings us closer to a better world.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 shadow-elevated">
              <CardHeader className="text-center pb-2">
                <CardTitle className="font-serif text-2xl">Choose Your Donation</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="flex gap-2 mb-8">
                  <Button variant={donationType === "one-time" ? "default" : "outline"} className="flex-1" onClick={() => setDonationType("one-time")}>One-Time</Button>
                  <Button variant={donationType === "monthly" ? "default" : "outline"} className="flex-1" onClick={() => setDonationType("monthly")}>Monthly</Button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {presetAmounts.map((preset) => (
                    <button key={preset} onClick={() => handlePresetClick(preset)} className={`py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all ${selectedPreset === preset ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/50 text-foreground"}`}>
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block">Or enter a custom amount</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input id="custom-amount" type="number" placeholder="0.00" value={amount} onChange={(e) => handleCustomAmount(e.target.value)} className="pl-8 text-lg h-12" min="1" />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-serif text-lg font-semibold">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="donor-name">Full Name</Label><Input id="donor-name" placeholder="John Doe" className="mt-1" /></div>
                    <div><Label htmlFor="donor-email">Email</Label><Input id="donor-email" type="email" placeholder="john@example.com" className="mt-1" /></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-serif text-lg font-semibold mb-4">Payment Method</h3>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="card" className="gap-2"><CreditCard className="w-4 h-4" /> Card</TabsTrigger>
                      <TabsTrigger value="mobile" className="gap-2"><Smartphone className="w-4 h-4" /> Mobile</TabsTrigger>
                      <TabsTrigger value="paypal" className="gap-2"><Globe className="w-4 h-4" /> PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4 text-center text-muted-foreground py-8">
                      <CreditCard className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" /><p>Stripe payment integration will be configured here.</p>
                    </TabsContent>
                    <TabsContent value="mobile" className="mt-4 text-center text-muted-foreground py-8">
                      <Smartphone className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" /><p>Pesapal mobile money integration will be configured here.</p>
                    </TabsContent>
                    <TabsContent value="paypal" className="mt-4 text-center text-muted-foreground py-8">
                      <Globe className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" /><p>PayPal integration will be configured here.</p>
                    </TabsContent>
                  </Tabs>
                </div>

                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-xl" disabled={!amount}>
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Donate {amount ? `$${amount}` : ""} {donationType === "monthly" ? "Monthly" : ""}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">Your donation is secure and encrypted. You'll receive a receipt via email.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DonateFunds;
