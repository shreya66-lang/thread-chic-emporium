import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Loader2, Sparkles } from "lucide-react";
import heroImage from "@/assets/priyasi-hero.jpg";
import outfit1 from "@/assets/khadi-outfit-1.jpg";
import outfit2 from "@/assets/khadi-outfit-2.jpg";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b border-primary/10 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Priyasi
          </h1>
          <CartDrawer />
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/30 to-accent/10">
        <img 
          src={heroImage} 
          alt="Traditional Charkha and Handwoven Khadi" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Handwoven with Love</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Where Tradition Meets Elegance
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover exquisite handwoven Khadi pieces, crafted by skilled artisans celebrating India's rich textile heritage
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="relative group overflow-hidden rounded-2xl shadow-elegant hover:shadow-vibrant transition-all duration-300">
            <img 
              src={outfit1} 
              alt="Elegant Khadi Fashion" 
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Timeless Kurtas</h3>
                <p className="text-white/90">Handcrafted elegance for every occasion</p>
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-2xl shadow-elegant hover:shadow-vibrant transition-all duration-300">
            <img 
              src={outfit2} 
              alt="Premium Khadi Sarees" 
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Graceful Sarees</h3>
                <p className="text-white/90">Draped in tradition, styled for you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Khadi Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each piece tells a story of craftsmanship, supporting local artisans and preserving the art of handloom
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
