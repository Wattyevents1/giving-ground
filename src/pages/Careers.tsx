import Layout from "@/components/layout/Layout";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const jobs = [
  { id: 1, title: "Program Manager", location: "Nairobi, Kenya", type: "Full-time", description: "Lead and coordinate community development programs across East Africa." },
  { id: 2, title: "Communications Officer", location: "Remote", type: "Full-time", description: "Manage digital communications, social media, and donor engagement." },
  { id: 3, title: "Field Coordinator", location: "Kampala, Uganda", type: "Contract", description: "Coordinate field operations and volunteer teams for active projects." },
  { id: 4, title: "Grant Writer", location: "Remote", type: "Part-time", description: "Research and write compelling grant proposals to secure funding." },
];

const Careers = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="w-12 h-12 mx-auto mb-6 text-charity-gold" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Careers</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Join our team and make your career meaningful.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="border-border/50 hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0 gap-1">Apply <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
