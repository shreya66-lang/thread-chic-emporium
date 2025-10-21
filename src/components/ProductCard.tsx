import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Sparkles, TrendingUp } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
  badge?: "new" | "bestseller" | "featured" | null;
}

export const ProductCard = ({ product, badge = null }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const imageUrl = node.images.edges[0]?.node.url;
  const price = node.priceRange.minVariantPrice;
  const defaultVariant = node.variants.edges[0]?.node;

  const getBadgeConfig = () => {
    switch (badge) {
      case "new":
        return { label: "New", icon: Sparkles, className: "bg-primary text-primary-foreground" };
      case "bestseller":
        return { label: "Bestseller", icon: TrendingUp, className: "bg-accent text-accent-foreground" };
      case "featured":
        return { label: "Featured", icon: Sparkles, className: "bg-secondary text-secondary-foreground" };
      default:
        return null;
    }
  };

  const badgeConfig = getBadgeConfig();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!defaultVariant) return;

    const cartItem = {
      product,
      variantId: defaultVariant.id,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      quantity: 1,
      selectedOptions: defaultVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart`,
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group">
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-6">
        {badgeConfig && (
          <Badge className={`absolute top-4 right-4 z-10 ${badgeConfig.className} flex items-center gap-1 text-xs tracking-wider`}>
            <badgeConfig.icon className="w-3 h-3" />
            {badgeConfig.label}
          </Badge>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Quick add button on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full"
            onClick={handleAddToCart}
            disabled={!defaultVariant?.availableForSale}
            size="sm"
          >
            {defaultVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm tracking-wide uppercase">{node.title}</h3>
        <p className="text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};
