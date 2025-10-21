import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(50);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category && category !== "all") {
      const categoryType = category === "kurtas" ? "Kurta" : category === "sarees" ? "Saree" : "";
      filtered = filtered.filter(product => product.node.productType === categoryType);
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.node.variants.edges.some(variant =>
          variant.node.selectedOptions.some(option =>
            option.name.toLowerCase() === "size" && 
            selectedSizes.includes(option.value)
          )
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        filtered.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "newest":
        filtered.reverse();
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, category, sortBy, priceRange, selectedSizes]);

  const getCategoryTitle = () => {
    if (!category || category === "all") return "All Products";
    return category === "kurtas" ? "Kurtas Collection" : "Sarees Collection";
  };

  const getCategoryDescription = () => {
    if (!category || category === "all") return "Browse our complete Khadi collection";
    return category === "kurtas" 
      ? "Handcrafted kurtas blending tradition with contemporary style"
      : "Elegant sarees woven with love and tradition";
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Home</span>
          </Link>
          <Link to="/home" className="text-xl font-bold tracking-tight">
            PRIYASI
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase">
              {getCategoryTitle()}
            </h2>
            <ProductFilters
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedSizes={selectedSizes}
              onSizesChange={setSelectedSizes}
              maxPrice={10000}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-secondary animate-pulse" />
                    <div className="h-4 bg-secondary animate-pulse w-3/4" />
                    <div className="h-4 bg-secondary animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
                <Button onClick={() => { setPriceRange([0, 10000]); setSelectedSizes([]); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Collections;