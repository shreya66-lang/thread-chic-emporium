import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { X } from "lucide-react";

interface ProductQuickViewProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (product?.node?.variants?.edges?.[0]) {
      const defaultVariant = product.node.variants.edges[0].node;
      setSelectedVariant(defaultVariant);
      
      const initialOptions: Record<string, string> = {};
      defaultVariant.selectedOptions.forEach((opt: any) => {
        initialOptions[opt.name] = opt.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  if (!product) return null;

  const { node } = product;
  const mainImage = node.images?.edges?.[0]?.node.url;
  const price = selectedVariant?.price || node.priceRange.minVariantPrice;

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = node.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((opt: any) => 
        newOptions[opt.name] === opt.value
      );
    });

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{node.title}</DialogTitle>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image */}
          <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-lg">
            {mainImage ? (
              <img
                src={mainImage}
                alt={node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">
                {node.title}
              </h2>
              <p className="text-xl font-medium">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
            </div>

            {node.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {node.description}
              </p>
            )}

            {/* Variant Selection */}
            {node.options?.length > 0 && (
              <div className="space-y-4">
                {node.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="block text-xs font-medium tracking-wider uppercase mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all border ${
                              isSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background border-border hover:border-primary'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
