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
    <Link to={`/product/${node.handle}`}>
      <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-secondary relative">
          {badgeConfig && (
            <Badge className={`absolute top-3 right-3 z-10 ${badgeConfig.className} flex items-center gap-1`}>
              <badgeConfig.icon className="w-3 h-3" />
              {badgeConfig.label}
            </Badge>
          )}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 truncate">{node.title}</h3>
          <p className="text-xl font-bold">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full"
            onClick={handleAddToCart}
            disabled={!defaultVariant?.availableForSale}
          >
            {defaultVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
