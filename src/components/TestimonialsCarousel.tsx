import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality of the khadi fabric is exceptional! I love how comfortable and elegant the kurta feels. The craftsmanship is truly outstanding.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "Delhi",
    rating: 5,
    text: "Absolutely in love with my saree purchase! The colors are vibrant and the fabric quality is superb. Priyasi is now my go-to for ethnic wear.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Finally found authentic khadi that's both traditional and contemporary. The delivery was prompt and the packaging was beautiful. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera"
  },
  {
    id: 4,
    name: "Kavya Singh",
    location: "Jaipur",
    rating: 5,
    text: "The attention to detail in every piece is remarkable. I've received so many compliments on my Priyasi kurta. Worth every penny!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya"
  }
];

export const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who love our handcrafted khadi collections
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="border-2 bg-gradient-to-br from-white/50 to-purple-50/50 dark:from-gray-900/50 dark:to-purple-950/50 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary mb-6 opacity-50" />
              
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={testimonials[current].image} 
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full ring-2 ring-primary/20"
                />
                <div>
                  <div className="flex mb-2">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl mb-6 text-foreground leading-relaxed">
                    "{testimonials[current].text}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[current].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prev}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        current === index 
                          ? "bg-primary w-8" 
                          : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={next}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};