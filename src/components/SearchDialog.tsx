import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(50);
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTimeout = setTimeout(() => {
      const filtered = allProducts.filter(product =>
        product.node.title.toLowerCase().includes(query.toLowerCase()) ||
        product.node.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, allProducts]);

  const handleProductClick = (handle: string) => {
    navigate(`/product/${handle}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for kurtas, sarees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            autoFocus
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No products found for "{query}"
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((product) => (
                <button
                  key={product.node.id}
                  onClick={() => handleProductClick(product.node.handle)}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                    {product.node.images?.edges?.[0]?.node && (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{product.node.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                      {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Start typing to search...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
