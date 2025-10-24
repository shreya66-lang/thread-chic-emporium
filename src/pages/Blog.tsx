import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleGuide } from "@/components/StyleGuide";
import { OutfitSuggestions } from "@/components/OutfitSuggestions";
import { ShopTheLook } from "@/components/ShopTheLook";

export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4">
          <Link to="/home">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Style & Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated looks, styling guides, and fashion inspiration
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <StyleGuide />
      <ShopTheLook />
      <OutfitSuggestions />
    </div>
  );
}