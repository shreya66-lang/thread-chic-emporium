import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Calendar, Briefcase, PartyPopper, Sun } from "lucide-react";

const occasions = [
  {
    id: "festive",
    label: "Festive",
    icon: PartyPopper,
    outfits: [
      {
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
        title: "Royal Embroidered Set",
        description: "Perfect for Diwali celebrations",
        items: ["Embroidered Kurta", "Silk Dupatta", "Palazzo"],
        colors: ["Purple", "Gold"]
      },
      {
        image: "https://images.unsplash.com/photo-1610030469990-686bed7c3f36?w=400&h=500&fit=crop",
        title: "Traditional Elegance",
        description: "Ideal for wedding ceremonies",
        items: ["Silk Saree", "Blouse", "Accessories"],
        colors: ["Red", "Gold"]
      }
    ]
  },
  {
    id: "casual",
    label: "Casual",
    icon: Sun,
    outfits: [
      {
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop",
        title: "Comfort & Style",
        description: "Daily wear essential",
        items: ["Cotton Kurta", "Leggings", "Light Stole"],
        colors: ["Beige", "White"]
      },
      {
        image: "https://images.unsplash.com/photo-1614852913808-89e8854c3d1e?w=400&h=500&fit=crop",
        title: "Weekend Vibes",
        description: "Perfect for brunches",
        items: ["Printed Kurta", "Straight Pants"],
        colors: ["Teal", "Orange"]
      }
    ]
  },
  {
    id: "formal",
    label: "Formal",
    icon: Briefcase,
    outfits: [
      {
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
        title: "Professional Chic",
        description: "Office-ready elegance",
        items: ["Solid Kurta", "Cigarette Pants", "Minimal Jewelry"],
        colors: ["Navy", "White"]
      },
      {
        image: "https://images.unsplash.com/photo-1583391733981-0021b9e6f1fe?w=400&h=500&fit=crop",
        title: "Corporate Grace",
        description: "Meeting essentials",
        items: ["A-line Kurta", "Trousers", "Blazer"],
        colors: ["Black", "Grey"]
      }
    ]
  },
  {
    id: "party",
    label: "Party",
    icon: Calendar,
    outfits: [
      {
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
        title: "Night Out Glam",
        description: "Cocktail party ready",
        items: ["Designer Kurta", "Palazzo", "Statement Jewelry"],
        colors: ["Maroon", "Gold"]
      },
      {
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop",
        title: "Evening Elegance",
        description: "Dinner party perfect",
        items: ["Anarkali", "Churidar", "Heavy Dupatta"],
        colors: ["Emerald", "Silver"]
      }
    ]
  }
];

export const OutfitSuggestions = () => {
  const [activeOccasion, setActiveOccasion] = useState("festive");

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-orange-950/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Virtual Stylist</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Outfit Suggestions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect outfit for every occasion with our AI-powered styling recommendations
          </p>
        </div>

        <Tabs value={activeOccasion} onValueChange={setActiveOccasion} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 h-auto p-1">
            {occasions.map((occasion) => {
              const Icon = occasion.icon;
              return (
                <TabsTrigger 
                  key={occasion.id} 
                  value={occasion.id}
                  className="flex flex-col gap-2 py-3"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{occasion.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {occasions.map((occasion) => (
            <TabsContent key={occasion.id} value={occasion.id}>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {occasion.outfits.map((outfit, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                          src={outfit.image} 
                          alt={outfit.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{outfit.title}</h3>
                          <p className="text-sm text-white/80 mb-4">{outfit.description}</p>
                          
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {outfit.items.map((item, i) => (
                                <Badge key={i} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-white/70">Colors:</span>
                              {outfit.colors.map((color, i) => (
                                <Badge key={i} variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 text-xs">
                                  {color}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button className="w-full mt-4 bg-white text-gray-900 hover:bg-white/90">
                            Shop This Look
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};