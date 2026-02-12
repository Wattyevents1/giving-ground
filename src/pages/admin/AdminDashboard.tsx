import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, FolderKanban, Mail, FileText, Package } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ donations: 0, totalAmount: 0, projects: 0, volunteers: 0, contacts: 0, blogPosts: 0, itemDonations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [donations, projects, volunteers, contacts, blogPosts, itemDonations] = await Promise.all([
        supabase.from("donations").select("amount"),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("volunteers").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("item_donations").select("id", { count: "exact", head: true }),
      ]);
      const totalAmount = (donations.data || []).reduce((sum, d) => sum + (d.amount || 0), 0);
      setStats({
        donations: donations.data?.length || 0,
        totalAmount,
        projects: projects.count || 0,
        volunteers: volunteers.count || 0,
        contacts: contacts.count || 0,
        blogPosts: blogPosts.count || 0,
        itemDonations: itemDonations.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Donations", value: `$${stats.totalAmount.toLocaleString()}`, sub: `${stats.donations} donations`, icon: Heart, color: "text-accent" },
    { label: "Projects", value: stats.projects, sub: "Total projects", icon: FolderKanban, color: "text-primary" },
    { label: "Volunteers", value: stats.volunteers, sub: "Applications", icon: Users, color: "text-charity-green-light" },
    { label: "Blog Posts", value: stats.blogPosts, sub: "Published & drafts", icon: FileText, color: "text-charity-gold" },
    { label: "Contact Messages", value: stats.contacts, sub: "Inbox", icon: Mail, color: "text-charity-orange" },
    { label: "Item Donations", value: stats.itemDonations, sub: "Submissions", icon: Package, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's an overview of your organization.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.label} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
