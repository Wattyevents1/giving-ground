import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Providing clean, safe drinking water to 5,000 families in rural Kenya through sustainable well construction.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop",
    location: "Turkana, Kenya",
    goal: 50000,
    raised: 38500,
    category: "Water & Sanitation",
  },
  {
    id: 2,
    title: "Education for Every Child",
    description: "Building schools and providing educational materials to underprivileged children in South Asia.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
    location: "Bihar, India",
    goal: 75000,
    raised: 52000,
    category: "Education",
  },
  {
    id: 3,
    title: "Food Security Program",
    description: "Establishing community gardens and food distribution networks to combat hunger in urban areas.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    location: "Lagos, Nigeria",
    goal: 30000,
    raised: 21000,
    category: "Food & Nutrition",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Your generosity fuels these life-changing initiatives. See how your donations make an impact.
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {
            const percentage = Math.round((project.raised / project.goal) * 100);
            return (
              <Card key={project.id} className="overflow-hidden group hover:shadow-elevated transition-all duration-300 border-border/50">
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">${project.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">of ${project.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{percentage}% funded</span>
                      <Link to={`/projects/${project.id}`}>
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs">
                          Donate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
