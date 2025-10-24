import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const styleGuides = [
  {
    id: 1,
    title: "How to Style Khadi Kurtas",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=400&fit=crop",
    excerpt: "Discover versatile ways to style your khadi kurtas for any occasion, from casual outings to formal events.",
    category: "Styling Tips",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Caring for Your Khadi",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop",
    excerpt: "Learn the best practices to maintain the quality and longevity of your precious khadi garments.",
    category: "Care Guide",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Festive Season Lookbook",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=400&fit=crop",
    excerpt: "Get inspired by our curated collection of festive outfits that celebrate Indian heritage with modern flair.",
    category: "Trends",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Sustainable Fashion Guide",
    image: "https://images.unsplash.com/photo-1614852913808-89e8854c3d1e?w=600&h=400&fit=crop",
    excerpt: "Understand the environmental impact of khadi and why choosing sustainable fashion matters.",
    category: "Sustainability",
    readTime: "7 min read"
  }
];

export const StyleGuide = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Style & Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Style Guide & Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our guides, styling tips, and stories about the art of khadi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {styleGuides.map((guide) => (
            <Card key={guide.id} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img 
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {guide.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                    <Button variant="ghost" size="sm" className="gap-2 group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/collections/all">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};