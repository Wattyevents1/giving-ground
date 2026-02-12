import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Contact = Tables<"contact_submissions">;

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetch = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
  };

  useEffect(() => { fetch(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
    toast.success("Marked as read");
    fetch();
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">{contacts.filter(c => !c.is_read).length} unread messages</p>
      </div>
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id} className={!c.is_read ? "bg-accent/5" : ""}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject || "—"}</TableCell>
                  <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                  <TableCell><Badge variant={c.is_read ? "secondary" : "default"}>{c.is_read ? "Read" : "New"}</Badge></TableCell>
                  <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{!c.is_read && <Button size="sm" variant="outline" onClick={() => markRead(c.id)}>Mark Read</Button>}</TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No messages yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminContacts;
