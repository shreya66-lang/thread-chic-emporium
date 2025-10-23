import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchDialog } from "@/components/SearchDialog";
import { useState } from "react";
import { ProductQuickView } from "@/components/ProductQuickView";
import { ShopifyProduct } from "@/lib/shopify";

export default function Wishlist() {
  const items = useWishlistStore(state => state.items);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleQuickView = (product: ShopifyProduct) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-yellow-50/30 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-yellow-950/10">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
        <nav className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <MobileMenu />
            
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
              <SearchDialog />
              <CartDrawer />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  My Wishlist
                </h1>
                <p className="text-muted-foreground mt-1">
                  {items.length} {items.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="hidden md:flex"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Wishlist Items */}
          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start adding your favorite items to your wishlist by clicking the heart icon on products
              </p>
              <Link to="/home">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {items.map((product) => (
                  <ProductCard 
                    key={product.node.id} 
                    product={product}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>

              {/* Mobile Clear All Button */}
              <div className="mt-12 text-center md:hidden">
                <Button 
                  variant="outline" 
                  onClick={clearWishlist}
                  className="w-full"
                >
                  Clear All Items
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Quick View Modal */}
      <ProductQuickView 
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </div>
  );
}
