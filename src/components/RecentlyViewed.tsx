import { useEffect, useState } from "react";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ShopifyProduct } from "@/lib/shopify";

export const RecentlyViewed = () => {
  const productHandles = useRecentlyViewedStore(state => state.productHandles);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (productHandles.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const productPromises = productHandles.map(handle => fetchProductByHandle(handle));
        const loadedProducts = await Promise.all(productPromises);
        const validProducts = loadedProducts
          .filter(p => p !== null)
          .map(p => ({ node: p }));
        setProducts(validProducts);
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [productHandles]);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Recently Viewed
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
