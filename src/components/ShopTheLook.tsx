import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface LookItem {
  id: string;
  name: string;
  price: string;
  position: { x: number; y: number };
}

const looks = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=1000&fit=crop",
    title: "Elegant Evening Look",
    description: "Perfect for festive occasions",
    items: [
      { id: "1", name: "Embroidered Kurta", price: "₹2,499", position: { x: 50, y: 30 } },
      { id: "2", name: "Silk Dupatta", price: "₹899", position: { x: 30, y: 60 } },
      { id: "3", name: "Palazzo Pants", price: "₹1,299", position: { x: 50, y: 80 } }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
    title: "Casual Chic",
    description: "Comfortable everyday style",
    items: [
      { id: "4", name: "Cotton Kurta", price: "₹1,799", position: { x: 50, y: 40 } },
      { id: "5", name: "Printed Stole", price: "₹699", position: { x: 65, y: 25 } },
      { id: "6", name: "Straight Pants", price: "₹999", position: { x: 50, y: 75 } }
    ]
  }
];

export const ShopTheLook = () => {
  const [activeLook, setActiveLook] = useState(0);
  const [selectedItem, setSelectedItem] = useState<LookItem | null>(null);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Shop The Look
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our curated outfit combinations. Click on the items to explore!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {looks.map((look, index) => (
            <Card 
              key={look.id} 
              className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                activeLook === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveLook(index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] group">
                  <img 
                    src={look.image} 
                    alt={look.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Hotspots */}
                  {look.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
                      style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
                    >
                      <Plus className="w-4 h-4 text-primary" />
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-white dark:bg-gray-900 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.price}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {/* Look info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {look.items.length} Items
                    </Badge>
                    <h3 className="text-2xl font-bold mb-1">{look.title}</h3>
                    <p className="text-sm text-white/80">{look.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Item Details Popup */}
        {selectedItem && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <Card className="max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{selectedItem.price}</p>
                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <Link to="/collections/all">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      View Product
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};