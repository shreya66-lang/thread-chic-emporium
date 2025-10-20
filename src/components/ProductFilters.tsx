import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedSizes: string[];
  onSizesChange: (sizes: string[]) => void;
  maxPrice: number;
}

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

export const ProductFilters = ({
  priceRange,
  onPriceRangeChange,
  selectedSizes,
  onSizesChange,
  maxPrice,
}: ProductFiltersProps) => {
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  const handleClearFilters = () => {
    onPriceRangeChange([0, maxPrice]);
    onSizesChange([]);
  };

  const hasActiveFilters = 
    priceRange[0] !== 0 || 
    priceRange[1] !== maxPrice || 
    selectedSizes.length > 0;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range Filter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Price Range</Label>
          </div>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>USD {priceRange[0]}</span>
              <span>USD {priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Size Filter */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold">Size</Label>
          <div className="space-y-3">
            {availableSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeToggle(size)}
                />
                <Label
                  htmlFor={`size-${size}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};