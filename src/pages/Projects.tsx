import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const allProjects = [
  { id: 1, title: "Clean Water for Rural Communities", description: "Providing clean, safe drinking water to 5,000 families in rural Kenya.", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop", location: "Turkana, Kenya", goal: 50000, raised: 38500, category: "Water & Sanitation", status: "active" },
  { id: 2, title: "Education for Every Child", description: "Building schools and providing educational materials to underprivileged children.", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop", location: "Bihar, India", goal: 75000, raised: 52000, category: "Education", status: "active" },
  { id: 3, title: "Food Security Program", description: "Establishing community gardens and food distribution networks to combat hunger.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop", location: "Lagos, Nigeria", goal: 30000, raised: 21000, category: "Food & Nutrition", status: "active" },
  { id: 4, title: "Mobile Health Clinics", description: "Bringing healthcare to remote areas through mobile medical units.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", location: "Mombasa, Kenya", goal: 60000, raised: 45000, category: "Healthcare", status: "active" },
  { id: 5, title: "Women's Empowerment Initiative", description: "Providing skills training, microloans, and mentorship to women entrepreneurs.", image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop", location: "Kampala, Uganda", goal: 40000, raised: 28000, category: "Empowerment", status: "active" },
  { id: 6, title: "Solar Energy for Schools", description: "Installing solar panels in rural schools to ensure consistent electricity.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop", location: "Dar es Salaam, Tanzania", goal: 55000, raised: 55000, category: "Environment", status: "completed" },
];

const categories = ["All", "Water & Sanitation", "Education", "Food & Nutrition", "Healthcare", "Empowerment", "Environment"];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allProjects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Projects</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore our initiatives and see how your contributions create lasting change.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)} className="text-xs">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((project) => {
              const percentage = Math.round((project.raised / project.goal) * 100);
              return (
                <Card key={project.id} className="overflow-hidden group hover:shadow-elevated transition-all duration-300 border-border/50">
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">{project.category}</span>
                      {project.status === "completed" && <span className="px-3 py-1 bg-charity-gold/90 text-foreground text-xs font-medium rounded-full backdrop-blur-sm">Completed</span>}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-3.5 h-3.5" /><span>{project.location}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">${project.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ${project.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{percentage}% funded</span>
                        <Link to={`/projects/${project.id}`}>
                          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs">{project.status === "completed" ? "View" : "Donate"}</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground"><p className="text-lg">No projects found matching your search.</p></div>}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
