import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchDialog } from "@/components/SearchDialog";
import { ProductQuickView } from "@/components/ProductQuickView";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { TrustBanner } from "@/components/TrustBanner";
import { CustomerFeedback } from "@/components/CustomerFeedback";
import { useWishlistStore } from "@/stores/wishlistStore";
import heroImage from "@/assets/priyasi-hero.jpg";

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlistCount = useWishlistStore(state => state.items.length);

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

  const handleQuickView = (product: ShopifyProduct) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mandala-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.3" opacity="0.4" />
              <circle cx="100" cy="100" r="10" fill="none" stroke="hsl(var(--chart-1))" strokeWidth="0.3" opacity="0.3" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const x = 100 + 25 * Math.cos((angle * Math.PI) / 180);
                const y = 100 + 25 * Math.sin((angle * Math.PI) / 180);
                return `<circle key="${i}" cx="${x}" cy="${y}" r="3" fill="hsl(var(--chart-${(i % 5) + 1}))" opacity="0.4" />`;
              }).join('')}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
        </svg>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
        <nav className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <MobileMenu />
            
            <Link to="/home" className="text-2xl font-bold tracking-tight">
              PRIYASI
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
              <Link to="/collections/all" className="hover:text-primary transition-colors">SHOP</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">STYLE GUIDE</Link>
              <Link to="/about" className="hover:text-primary transition-colors">ABOUT</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
            </div>

            <div className="flex items-center gap-4">
              <SearchDialog />
              <Link to="/wishlist" className="relative hidden md:block">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <CartDrawer />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        {/* Colorful Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/30 to-yellow-100/30 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.15),transparent_40%)] z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)] z-[1]" />
        
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-pink-900/20 to-orange-900/30" />
        </div>

        {/* Decorative Geometric Elements */}
        <svg className="absolute inset-0 w-full h-full z-[2] opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 146, 60, 0.6)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
            </linearGradient>
            <linearGradient id="hero-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
            </linearGradient>
          </defs>
          <circle cx="10%" cy="20%" r="80" fill="none" stroke="url(#hero-grad-1)" strokeWidth="2" className="animate-spin-slow" style={{ transformOrigin: "10% 20%" }} />
          <circle cx="90%" cy="80%" r="100" fill="none" stroke="url(#hero-grad-2)" strokeWidth="2" className="animate-spin-reverse" style={{ transformOrigin: "90% 80%" }} />
          <circle cx="85%" cy="15%" r="60" fill="none" stroke="rgba(250, 204, 21, 0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-2xl">
            TIMELESS ELEGANCE
          </h1>
          <p className="text-lg md:text-xl mb-12 tracking-wide max-w-2xl mx-auto drop-shadow-lg">
            Discover the art of handwoven khadi in our new collection
          </p>
          <Link to="/collections/all">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white border-0 shadow-2xl">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Banner */}
      <TrustBanner />

      {/* Category Navigation */}
      <section className="relative py-24 px-6 lg:px-12 border-b border-border overflow-hidden">
        {/* Decorative Corner Mandalas */}
        <svg className="absolute top-0 left-0 w-48 h-48 opacity-20 -translate-x-12 -translate-y-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--chart-1))" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-20 translate-x-12 translate-y-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--chart-3))" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(var(--chart-4))" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" />
        </svg>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                SHOP BY CATEGORY
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full mt-4" />
            </div>
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
      <section className="relative py-24 px-6 lg:px-12 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-yellow-50/50 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-yellow-950/10 overflow-hidden">
        {/* Animated Decorative Circles */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300/20 to-yellow-300/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
            <div>
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  FEATURED COLLECTION
                </h2>
                <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full" />
              </div>
              <p className="text-muted-foreground text-lg mt-4">
                Curated pieces for the modern wardrobe
              </p>
            </div>
            <Link to="/collections/all">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0">
                VIEW ALL
              </Button>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featuredProducts.map((product, idx) => {
                const badge = idx === 0 ? "new" : idx === 1 ? "bestseller" : idx === 2 ? "featured" : null;
                return (
                  <ProductCard 
                    key={product.node.id} 
                    product={product} 
                    badge={badge}
                    onQuickView={handleQuickView}
                  />
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

      {/* Recently Viewed Section */}
      <RecentlyViewed />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Customer Feedback */}
      <CustomerFeedback />

      {/* Newsletter Subscription */}
      <NewsletterSubscription />

      {/* Brand Story */}
      <section className="relative py-24 px-6 lg:px-12 bg-gradient-to-br from-purple-100/40 via-pink-100/30 to-orange-100/40 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-orange-950/30 overflow-hidden">
        {/* Decorative Mandala Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="story-mandala" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              <g transform="translate(150, 150)">
                <circle r="80" fill="none" stroke="hsl(var(--chart-1))" strokeWidth="2" />
                <circle r="60" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
                <circle r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                  const x = 70 * Math.cos((angle * Math.PI) / 180);
                  const y = 70 * Math.sin((angle * Math.PI) / 180);
                  return `<circle key="${i}" cx="${x}" cy="${y}" r="6" fill="hsl(var(--chart-${(i % 5) + 1}))" opacity="0.6" />`;
                }).join('')}
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#story-mandala)" />
        </svg>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="relative inline-block mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              CRAFTED WITH PURPOSE
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full mt-4" />
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Each piece in our collection tells a story of tradition, craftsmanship, and timeless beauty. 
            We work with skilled artisans to bring you handwoven khadi garments that celebrate heritage 
            while embracing contemporary design.
          </p>
          <Link to="/about">
            <Button className="bg-gradient-to-r from-accent via-primary to-pink-500 hover:from-accent/90 hover:via-primary/90 hover:to-pink-600 text-white border-0 shadow-lg">
              LEARN OUR STORY
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white py-16 px-6 lg:px-12 overflow-hidden">
        {/* Decorative Footer Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="footer-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#footer-dots)" />
          </svg>
        </div>
        <div className="container mx-auto relative z-10">
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
                <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Style Guide</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">SUPPORT</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/shipping" className="hover:opacity-100 transition-opacity">Shipping & Returns</Link></li>
                <li><Link to="/size-guide" className="hover:opacity-100 transition-opacity">Size Guide</Link></li>
                <li><Link to="/care" className="hover:opacity-100 transition-opacity">Care Instructions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© 2025 Priyasi. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick View Modal */}
      <ProductQuickView 
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </div>
  );
}
