import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Loader2 } from "lucide-react";
import heroImage from "@/assets/khadi-hero.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Khadi Sanskriti</h1>
          <CartDrawer />
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <img 
          src={heroImage} 
          alt="Handwoven Khadi Fabric" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative container mx-auto px-4 py-24 md:py-40 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground drop-shadow-lg animate-fade-in">
            Heritage in Every Thread
          </h2>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto text-foreground/90 mb-4 drop-shadow">
            Discover the timeless beauty of handwoven Khadi - celebrating India's rich textile tradition
          </p>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto italic">
            "खादी भारत की संस्कृति और स्वतंत्रता का प्रतीक है"
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Khadi Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each piece is handcrafted with love, supporting local artisans and preserving traditional weaving techniques
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No products found</p>
            <p className="text-muted-foreground">
              Create your first product by telling me what you'd like to sell and the price!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
