import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import heroImage from "@/assets/priyasi-hero.jpg";

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 6);

  const getFilteredProducts = () => {
    if (activeCategory === "all") return products;
    return products.filter(p => 
      p.node.title.toLowerCase().includes(activeCategory.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            
          <Link to="/home" className="text-2xl font-bold tracking-tight">
            PRIYASI
          </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
              <Link to="/collections/all" className="hover:text-primary transition-colors">NEW ARRIVALS</Link>
              <Link to="/collections/kurtas" className="hover:text-primary transition-colors">KURTAS</Link>
              <Link to="/collections/sarees" className="hover:text-primary transition-colors">SAREES</Link>
              <Link to="/collections/all" className="hover:text-primary transition-colors">COLLECTIONS</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block">
                <Search className="h-5 w-5" />
              </button>
              <CartDrawer />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            TIMELESS ELEGANCE
          </h1>
          <p className="text-lg md:text-xl mb-12 tracking-wide max-w-2xl mx-auto">
            Discover the art of handwoven khadi in our new collection
          </p>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            SHOP NOW
          </Button>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-24 px-6 lg:px-12 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none mb-12">
              <TabsTrigger 
                value="all" 
                className="text-sm md:text-base font-medium tracking-wider px-6 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                ALL
              </TabsTrigger>
              <TabsTrigger 
                value="kurta" 
                className="text-sm md:text-base font-medium tracking-wider px-6 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                KURTAS
              </TabsTrigger>
              <TabsTrigger 
                value="saree" 
                className="text-sm md:text-base font-medium tracking-wider px-6 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                SAREES
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-secondary animate-pulse" />
              ))}
            </div>
          ) : getFilteredProducts().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {getFilteredProducts().map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                FEATURED COLLECTION
              </h2>
              <p className="text-muted-foreground text-lg">
                Curated pieces for the modern wardrobe
              </p>
            </div>
            <Link to="/collections/all">
              <Button variant="outline">VIEW ALL</Button>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featuredProducts.map((product, idx) => {
                const badge = idx === 0 ? "new" : idx === 1 ? "bestseller" : idx === 2 ? "featured" : null;
                return (
                  <ProductCard key={product.node.id} product={product} badge={badge} />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No featured products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            CRAFTED WITH PURPOSE
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Each piece in our collection tells a story of tradition, craftsmanship, and timeless beauty. 
            We work with skilled artisans to bring you handwoven khadi garments that celebrate heritage 
            while embracing contemporary design.
          </p>
          <Button variant="outline">LEARN OUR STORY</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">PRIYASI</h3>
              <p className="text-sm opacity-80">
                Timeless elegance in handwoven khadi
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">SHOP</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/collections/all" className="hover:opacity-100 transition-opacity">New Arrivals</Link></li>
                <li><Link to="/collections/kurtas" className="hover:opacity-100 transition-opacity">Kurtas</Link></li>
                <li><Link to="/collections/sarees" className="hover:opacity-100 transition-opacity">Sarees</Link></li>
                <li><Link to="/collections/all" className="hover:opacity-100 transition-opacity">All Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">SUPPORT</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping & Returns</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Size Guide</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Care Instructions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© 2025 Priyasi. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
