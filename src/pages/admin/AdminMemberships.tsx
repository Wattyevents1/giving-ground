import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Membership = Tables<"memberships">;

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    supabase.from("memberships").select("*").order("created_at", { ascending: false }).then(({ data }) => setMemberships(data || []));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Memberships</h1>
        <p className="text-muted-foreground mt-1">{memberships.length} members</p>
      </div>
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.donor_name || "—"}</TableCell>
                  <TableCell>{m.donor_email}</TableCell>
                  <TableCell><Badge variant="outline">{m.tier}</Badge></TableCell>
                  <TableCell><Badge variant={m.status === "active" ? "default" : "secondary"}>{m.status}</Badge></TableCell>
                  <TableCell>{new Date(m.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {memberships.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No memberships yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminMemberships;
