import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Instagram posts - in production, integrate with Instagram API
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
    likes: 234,
    caption: "Handcrafted khadi magic ✨"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    likes: 189,
    caption: "Traditional meets contemporary"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop",
    likes: 312,
    caption: "Sustainable fashion at its finest"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1614852913808-89e8854c3d1e?w=400&h=400&fit=crop",
    likes: 267,
    caption: "Elegance in every thread"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1583391733981-0021b9e6f1fe?w=400&h=400&fit=crop",
    likes: 198,
    caption: "Celebrate khadi, celebrate heritage"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1610030469990-686bed7c3f36?w=400&h=400&fit=crop",
    likes: 245,
    caption: "Timeless Indian fashion"
  }
];

export const InstagramFeed = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-purple-50/30 dark:to-purple-950/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              #PriyasiStyle
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow us on Instagram for daily style inspiration and exclusive behind-the-scenes content
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/priyasi`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img 
                src={post.image} 
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Instagram className="w-4 h-4 text-white" />
                    <span className="text-white text-xs">{post.likes} likes</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="gap-2"
            asChild
          >
            <a href="https://instagram.com/priyasi" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5" />
              Follow @priyasi
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};