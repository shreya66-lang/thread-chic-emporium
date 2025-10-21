import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import khadiHero from "@/assets/khadi-hero.jpg";
import khadiOutfit1 from "@/assets/khadi-outfit-1.jpg";
import khadiOutfit2 from "@/assets/khadi-outfit-2.jpg";

export default function About() {
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

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden mb-24">
          <img
            src={khadiHero}
            alt="Khadi craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              OUR STORY
            </h1>
          </div>
        </section>

        {/* Story Content */}
        <section className="container mx-auto px-6 lg:px-12 mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Weaving Tradition with Modern Elegance
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Priyasi was born from a deep reverence for India's rich textile heritage and a vision 
                to bring handwoven khadi to the modern wardrobe. Our journey began with a simple belief: 
                that traditional craftsmanship deserves a place in contemporary fashion.
              </p>
              <p>
                Each garment in our collection is a testament to the skilled hands of artisans who have 
                mastered the ancient art of khadi weaving. These craftspeople, spread across different 
                regions of India, pour their expertise and soul into every thread, creating fabrics that 
                breathe, drape beautifully, and age gracefully.
              </p>
              <p>
                We believe in slow fashion—pieces that transcend seasons and trends, that become more 
                precious with time. By choosing Priyasi, you're not just wearing beautiful clothes; 
                you're supporting sustainable practices and preserving a craft that has been passed down 
                through generations.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Grid */}
        <section className="container mx-auto px-6 lg:px-12 mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={khadiOutfit1}
                alt="Handwoven khadi detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={khadiOutfit2}
                alt="Traditional craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary py-24 px-6 lg:px-12 mb-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              OUR VALUES
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 tracking-wider">CRAFTSMANSHIP</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every piece is meticulously handcrafted by skilled artisans who have honed their 
                  craft over decades, ensuring unparalleled quality.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 tracking-wider">SUSTAINABILITY</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Khadi is naturally sustainable—requiring no machinery, minimal water, and creating 
                  zero carbon footprint in its production.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 tracking-wider">HERITAGE</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We honor centuries-old weaving traditions while adapting designs for the modern 
                  wearer, bridging past and present.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            EXPLORE OUR COLLECTION
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover timeless pieces that celebrate tradition and elevate your wardrobe
          </p>
          <Link to="/collections/all">
            <Button size="lg">SHOP NOW</Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 px-6 lg:px-12 mt-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">PRIYASI</h3>
              <p className="text-sm opacity-80">
                Timeless elegance in handwoven khadi
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">SHOP</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/collections/all" className="hover:opacity-100 transition-opacity">New Arrivals</Link></li>
                <li><Link to="/collections/kurtas" className="hover:opacity-100 transition-opacity">Kurtas</Link></li>
                <li><Link to="/collections/sarees" className="hover:opacity-100 transition-opacity">Sarees</Link></li>
                <li><Link to="/collections/all" className="hover:opacity-100 transition-opacity">All Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm tracking-wider mb-4">SUPPORT</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/shipping" className="hover:opacity-100 transition-opacity">Shipping & Returns</Link></li>
                <li><Link to="/size-guide" className="hover:opacity-100 transition-opacity">Size Guide</Link></li>
                <li><Link to="/care" className="hover:opacity-100 transition-opacity">Care Instructions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© 2025 Priyasi. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
