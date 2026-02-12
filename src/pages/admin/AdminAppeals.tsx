import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AdminAppeals = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Urgent Appeals</h1>
        <p className="text-muted-foreground mt-1">Manage time-sensitive campaigns</p>
      </div>
      <Card className="border-border/50">
        <CardContent className="p-12 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Appeals management will be powered by the Projects table with an "urgent" flag. Use Projects to create urgent campaigns.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminAppeals;
