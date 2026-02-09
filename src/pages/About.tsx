import Layout from "@/components/layout/Layout";
import { Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  { name: "Dr. Grace Muthoni", role: "Executive Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" },
  { name: "James Kariuki", role: "Head of Programs", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
  { name: "Fatima Hassan", role: "Finance Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face" },
  { name: "Peter Oloo", role: "Community Liaison", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
];

const timeline = [
  { year: "2010", title: "Founded", description: "Hope Foundation was established with a vision to empower communities." },
  { year: "2013", title: "First Major Project", description: "Launched our first clean water initiative serving 1,000 families." },
  { year: "2016", title: "Expanded Reach", description: "Extended operations to 5 countries across Africa and South Asia." },
  { year: "2019", title: "10,000 Lives Impacted", description: "Reached the milestone of impacting 10,000 lives through our programs." },
  { year: "2023", title: "Global Recognition", description: "Received the Global Humanitarian Award for outstanding community service." },
  { year: "2025", title: "50,000+ Impacted", description: "Surpassed 50,000 lives changed through sustainable development programs." },
];

const About = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We are a team of passionate individuals dedicated to creating lasting positive change in communities around the world.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower underserved communities through sustainable development programs in education, healthcare, water, and food security, creating pathways to self-sufficiency and dignity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-serif text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every individual has access to clean water, quality education, nutritious food, and the opportunity to live with dignity and hope for the future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Meet the dedicated individuals who drive our mission forward every day.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-border group-hover:ring-accent transition-colors">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From humble beginnings to global impact — here's how we've grown.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
