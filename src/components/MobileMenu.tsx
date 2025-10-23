import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Badge } from "@/components/ui/badge";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const wishlistCount = useWishlistStore(state => state.items.length);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold tracking-tight">PRIYASI</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 mt-8">
          <Link 
            to="/" 
            className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            HOME
          </Link>
          <Link 
            to="/collections/all" 
            className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            NEW ARRIVALS
          </Link>
          <Link 
            to="/collections/kurtas" 
            className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            KURTAS
          </Link>
          <Link 
            to="/collections/sarees" 
            className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            SAREES
          </Link>
          <Link 
            to="/collections/all" 
            className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            COLLECTIONS
          </Link>
          <div className="border-t border-border pt-6 mt-4 space-y-6">
            <Link 
              to="/wishlist" 
              className="text-lg font-medium tracking-wider hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Heart className="h-5 w-5" />
              WISHLIST
              {wishlistCount > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium tracking-wider hover:text-primary transition-colors block"
              onClick={() => setOpen(false)}
            >
              ABOUT US
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
