import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin, Heart, Users, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const projectsData: Record<string, { title: string; description: string; longDescription: string; image: string; gallery: string[]; location: string; goal: number; raised: number; category: string; donors: number; startDate: string; }> = {
  "1": {
    title: "Clean Water for Rural Communities", description: "Providing clean, safe drinking water to 5,000 families.", longDescription: "Access to clean water is a fundamental human right, yet millions of people in rural Kenya still rely on contaminated water sources. This project aims to construct sustainable wells and water purification systems serving 5,000 families across Turkana County. Our approach includes community training for maintenance, ensuring long-term sustainability. Each well serves approximately 500 people and reduces water-borne diseases by up to 80%.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1594398901394-4e34939a02bc?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&h=300&fit=crop"],
    location: "Turkana, Kenya", goal: 50000, raised: 38500, category: "Water & Sanitation", donors: 284, startDate: "2025-03-15",
  },
  "2": {
    title: "Education for Every Child", description: "Building schools for underprivileged children.", longDescription: "Education is the cornerstone of community development. This initiative focuses on building modern school facilities in Bihar, India, providing educational materials, teacher training, and scholarship programs. We aim to reach 10,000 children with quality education by 2027.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&h=300&fit=crop"],
    location: "Bihar, India", goal: 75000, raised: 52000, category: "Education", donors: 412, startDate: "2024-09-01",
  },
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projectsData[id || "1"] || projectsData["1"];
  const percentage = Math.round((project.raised / project.goal) * 100);

  return (
    <Layout>
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full mb-3">{project.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">{project.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-border/50"><CardContent className="p-4 text-center"><Users className="w-6 h-6 text-accent mx-auto mb-2" /><p className="font-serif text-xl font-bold">{project.donors}</p><p className="text-xs text-muted-foreground">Donors</p></CardContent></Card>
                <Card className="border-border/50"><CardContent className="p-4 text-center"><MapPin className="w-6 h-6 text-accent mx-auto mb-2" /><p className="font-serif text-xl font-bold">{project.location.split(",")[0]}</p><p className="text-xs text-muted-foreground">Location</p></CardContent></Card>
                <Card className="border-border/50"><CardContent className="p-4 text-center"><Calendar className="w-6 h-6 text-accent mx-auto mb-2" /><p className="font-serif text-xl font-bold">{new Date(project.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p><p className="text-xs text-muted-foreground">Started</p></CardContent></Card>
              </div>
            </div>

            <div>
              <Card className="sticky top-24 border-border/50 shadow-elevated">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-4">Support This Project</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm"><span className="font-semibold">${project.raised.toLocaleString()}</span><span className="text-muted-foreground">of ${project.goal.toLocaleString()}</span></div>
                    <Progress value={percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground"><span>{percentage}% funded</span><span>{project.donors} donors</span></div>
                  </div>
                  <Link to="/donate"><Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-5 mb-3"><Heart className="w-4 h-4 mr-2 fill-current" />Donate Now</Button></Link>
                  <Button variant="outline" className="w-full gap-2"><Share2 className="w-4 h-4" />Share This Project</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetails;
