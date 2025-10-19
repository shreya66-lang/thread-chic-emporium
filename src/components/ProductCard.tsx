import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const imageUrl = node.images.edges[0]?.node.url;
  const price = node.priceRange.minVariantPrice;
  const defaultVariant = node.variants.edges[0]?.node;

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
      <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-secondary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
