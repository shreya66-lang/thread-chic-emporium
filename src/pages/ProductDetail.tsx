import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Heart } from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { SizeGuide } from "@/components/SizeGuide";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const addToRecentlyViewed = useRecentlyViewedStore(state => state.addProduct);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      setLoading(true);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        
        // Track in recently viewed
        addToRecentlyViewed(handle);
        
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
  }, [handle, addToRecentlyViewed]);

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

  const inWishlist = product ? isInWishlist(product.id) : false;

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

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({ node: product });
      toast.success("Added to wishlist");
    }
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
        <Link to="/home">
          <Button>Back to Store</Button>
        </Link>
      </div>
    );
  }

  const mainImage = product.images?.edges?.[0]?.node.url;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Back</span>
          </Link>
          <Link to="/home" className="text-xl font-bold tracking-tight">
            PRIYASI
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
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
              <div className="grid grid-cols-4 gap-4">
                {product.images.edges.slice(0, 4).map((image: any, idx: number) => (
                  <div key={idx} className="aspect-square bg-secondary overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
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
          <div className="flex flex-col gap-8 lg:pt-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {product.title}
              </h1>
              <p className="text-2xl font-medium mb-8">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
            </div>

            {/* Size Guide */}
            <div className="flex items-center justify-between">
              <SizeGuide />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className="gap-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    inWishlist ? "fill-red-500 text-red-500" : ""
                  }`} 
                />
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Variant Selection */}
            {product.options?.length > 0 && (
              <div className="space-y-6 border-t border-border pt-8">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium tracking-wider uppercase mb-4">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value: string) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all border ${
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
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Product Description */}
            {product.description && (
              <div className="border-t border-border pt-8">
                <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-border pt-8">
              <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Material</span>
                  <span>Handwoven Khadi</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Origin</span>
                  <span>India</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Care</span>
                  <span>Hand wash cold</span>
                </div>
                {selectedVariant?.availableForSale !== undefined && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Availability</span>
                    <span className={selectedVariant.availableForSale ? "text-green-600" : "text-red-600"}>
                      {selectedVariant.availableForSale ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
