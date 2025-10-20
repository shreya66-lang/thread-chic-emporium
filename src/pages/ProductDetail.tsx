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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b border-primary/10 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Store</span>
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden shadow-elegant">
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
            {product.images?.edges?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(0, 4).map((image: any, idx: number) => (
                  <div key={idx} className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                    <img
                      src={image.node.url}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              {product.productType && (
                <Badge variant="secondary" className="mb-3">
                  {product.productType}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-4xl font-bold text-primary">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
                {selectedVariant?.availableForSale ? (
                  <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Variant Selection */}
            {product.options?.length > 0 && (
              <div className="space-y-6 border-t border-b border-border py-6">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="block text-lg font-semibold mb-3">
                      {option.name}: <span className="text-primary">{selectedOptions[option.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value: string) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                              isSelected
                                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                                : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
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
              size="lg"
              className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </Button>

            {/* Product Description */}
            {product.description && (
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-3">About this item</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {product.productType && (
              <div className="flex py-3 border-b border-border">
                <span className="font-semibold min-w-[140px]">Category:</span>
                <span className="text-muted-foreground">{product.productType}</span>
              </div>
            )}
            {selectedVariant && (
              <>
                <div className="flex py-3 border-b border-border">
                  <span className="font-semibold min-w-[140px]">Availability:</span>
                  <span className={selectedVariant.availableForSale ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {selectedVariant.availableForSale ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {selectedVariant.selectedOptions?.map((opt: any) => (
                  <div key={opt.name} className="flex py-3 border-b border-border">
                    <span className="font-semibold min-w-[140px]">{opt.name}:</span>
                    <span className="text-muted-foreground">{opt.value}</span>
                  </div>
                ))}
              </>
            )}
            <div className="flex py-3 border-b border-border">
              <span className="font-semibold min-w-[140px]">Material:</span>
              <span className="text-muted-foreground">Handwoven Khadi</span>
            </div>
            <div className="flex py-3 border-b border-border">
              <span className="font-semibold min-w-[140px]">Origin:</span>
              <span className="text-muted-foreground">India</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
