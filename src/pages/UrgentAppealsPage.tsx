import Layout from "@/components/layout/Layout";
import { AlertTriangle, Clock, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const appeals = [
  { id: 1, title: "Emergency Flood Relief", description: "Thousands displaced by severe flooding need shelter, food, and medical aid.", image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&h=400&fit=crop", location: "Coastal Kenya", goal: 100000, raised: 67000, daysLeft: 12 },
  { id: 2, title: "Drought Relief — East Africa", description: "Severe drought has left communities without food or water. Urgent supplies needed.", image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop", location: "Turkana, Kenya", goal: 80000, raised: 34000, daysLeft: 21 },
];

const UrgentAppealsPage = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-6 text-charity-gold" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Urgent Appeals</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Time-sensitive campaigns that need your immediate support.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {appeals.map((appeal) => {
              const percentage = Math.round((appeal.raised / appeal.goal) * 100);
              return (
                <Card key={appeal.id} className="overflow-hidden border-border/50 shadow-card">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-[4/3] md:aspect-auto"><img src={appeal.image} alt={appeal.title} className="w-full h-full object-cover" loading="lazy" /></div>
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full w-fit mb-4"><AlertTriangle className="w-3.5 h-3.5" />Urgent</div>
                      <h3 className="font-serif text-2xl font-bold mb-2">{appeal.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3"><MapPin className="w-3.5 h-3.5" /> {appeal.location}</div>
                      <p className="text-muted-foreground text-sm mb-6">{appeal.description}</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm"><span className="font-semibold">${appeal.raised.toLocaleString()}</span><span className="text-muted-foreground">of ${appeal.goal.toLocaleString()}</span></div>
                        <Progress value={percentage} className="h-2.5" />
                        <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">{percentage}% funded</span><div className="flex items-center gap-1 text-xs text-destructive"><Clock className="w-3.5 h-3.5" />{appeal.daysLeft} days left</div></div>
                      </div>
                      <Link to="/donate"><Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"><Heart className="w-4 h-4 mr-2 fill-current" />Donate Now</Button></Link>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UrgentAppealsPage;
