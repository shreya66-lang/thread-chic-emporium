import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      setLoading(true);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        
        if (data?.variants?.edges?.[0]) {
          const defaultVariant = data.variants.edges[0].node;
          setSelectedVariant(defaultVariant);
          
          const initialOptions: Record<string, string> = {};
          defaultVariant.selectedOptions.forEach((opt: any) => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = product.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((opt: any) => 
        newOptions[opt.name] === opt.value
      );
    });

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/">
          <Button>Back to Store</Button>
        </Link>
      </div>
    );
  }

  const mainImage = product.images?.edges?.[0]?.node.url;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Store</span>
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-3xl font-bold mb-6">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            {product.options?.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="block font-semibold mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <Badge
                          key={value}
                          variant={selectedOptions[option.name] === value ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent transition-colors px-4 py-2"
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
