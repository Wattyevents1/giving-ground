import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  { id: 1, title: "How Clean Water Changes Everything", excerpt: "Access to clean water transforms health, education, and economic opportunities in rural communities.", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop", author: "Dr. Grace Muthoni", date: "2025-12-15", category: "Impact Stories" },
  { id: 2, title: "Volunteer Spotlight: David's Journey", excerpt: "From first-time volunteer to program leader — David shares his transformative experience.", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop", author: "Sarah Mitchell", date: "2025-11-28", category: "Volunteers" },
  { id: 3, title: "2025 Annual Impact Report", excerpt: "A comprehensive look at our achievements, challenges, and goals for the year ahead.", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop", author: "James Kariuki", date: "2025-11-10", category: "Reports" },
  { id: 4, title: "Education: The Foundation of Change", excerpt: "Why investing in education creates ripple effects that transform entire communities.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", author: "Fatima Hassan", date: "2025-10-22", category: "Education" },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const filtered = blogPosts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Blog & News</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Stories of impact, updates from the field, and insights into our work.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-elevated transition-all duration-300 border-border/50">
                <div className="relative overflow-hidden aspect-[2/1]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3"><span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">{post.category}</span></div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span></div>
                    <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" /><span>{post.author}</span></div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-accent font-semibold gap-1">Read More <ArrowRight className="w-4 h-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground"><p className="text-lg">No articles found matching your search.</p></div>}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
