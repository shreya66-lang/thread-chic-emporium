import { Truck, Shield, RefreshCw, Phone } from "lucide-react";

const trustFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected transactions"
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Dedicated customer care"
  }
];

export const TrustBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};