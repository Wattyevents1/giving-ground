import Layout from "@/components/layout/Layout";
import { Heart, Star, Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const tiers = [
  { name: "Supporter", price: 10, icon: Heart, description: "Show your support with a monthly contribution.", features: ["Monthly newsletter", "Name on supporters wall", "Tax-deductible receipt", "Project updates via email"], popular: false },
  { name: "Partner", price: 50, icon: Star, description: "Make a greater impact with enhanced benefits.", features: ["Everything in Supporter", "Quarterly impact reports", "Invitation to virtual events", "Early access to new projects", "Partner badge & certificate"], popular: true },
  { name: "Champion", price: 100, icon: Crown, description: "Lead the charge with our premium membership.", features: ["Everything in Partner", "Annual gala invitation", "Direct project sponsorship", "One-on-one with leadership", "Name on project plaques", "VIP field visit opportunity"], popular: false },
];

const Membership = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Membership Plans</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Join our community of changemakers. Choose a plan that fits your commitment.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`relative border-border/50 ${tier.popular ? "ring-2 ring-accent shadow-elevated scale-105" : "hover:shadow-card"} transition-all duration-300`}>
                {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-4 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">Most Popular</span></div>}
                <CardHeader className="text-center pb-2">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center"><tier.icon className="w-7 h-7 text-primary" /></div>
                  <CardTitle className="font-serif text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6"><span className="font-serif text-4xl font-bold text-foreground">${tier.price}</span><span className="text-muted-foreground text-sm">/month</span></div>
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span className="text-muted-foreground">{feature}</span></li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full font-semibold ${tier.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`} variant={tier.popular ? "default" : "outline"}>
                    Join as {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
