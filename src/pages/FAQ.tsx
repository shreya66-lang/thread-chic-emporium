import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "We typically ship orders within 2-3 business days. Delivery takes 5-7 business days within India. Express shipping (2-3 days) is available at checkout."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping takes 10-15 business days. Customs duties and taxes are the responsibility of the customer."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our shipping partner's website."
      },
      {
        q: "What if my order is delayed?",
        a: "If your order is delayed beyond the estimated delivery date, please contact our customer support team and we'll investigate immediately."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy. Items must be unworn, unwashed, and in original condition with all tags attached. Return shipping is free for orders above ₹999."
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our support team within 30 days of delivery. We'll send you a prepaid return label and instructions. Once we receive and inspect the item, we'll process your refund within 7-10 business days."
      },
      {
        q: "Can I exchange an item?",
        a: "Yes! If you need a different size or color, we offer free exchanges. Simply return your original item and place a new order for the item you want."
      },
      {
        q: "Are sale items returnable?",
        a: "Items marked as 'Final Sale' cannot be returned or exchanged. All other sale items follow our standard return policy."
      }
    ]
  },
  {
    category: "Products & Care",
    questions: [
      {
        q: "What is khadi fabric?",
        a: "Khadi is a hand-spun, hand-woven natural fiber cloth. It's breathable, eco-friendly, and represents Indian heritage. Our khadi garments are made by skilled artisans using traditional techniques."
      },
      {
        q: "How should I care for khadi garments?",
        a: "Hand wash in cold water with mild detergent. Avoid harsh chemicals and bleach. Dry in shade, not direct sunlight. Iron on medium heat while slightly damp for best results."
      },
      {
        q: "Do your clothes shrink after washing?",
        a: "Natural khadi may shrink slightly (2-3%) after the first wash. We recommend following our care instructions carefully to minimize shrinkage."
      },
      {
        q: "Are your products eco-friendly?",
        a: "Yes! Khadi is biodegradable, requires no machinery, and has minimal environmental impact. We use natural dyes wherever possible and sustainable packaging."
      }
    ]
  },
  {
    category: "Sizing & Fit",
    questions: [
      {
        q: "How do I find my size?",
        a: "Use our detailed size guide available on each product page. If you're between sizes, we recommend sizing up for a comfortable fit."
      },
      {
        q: "Do you offer custom sizing?",
        a: "Yes! We offer custom tailoring for select products. Contact us with your measurements and we'll create a garment perfectly fitted to you."
      },
      {
        q: "Can I see size comparisons?",
        a: "Our size guide includes detailed measurements and comparison charts. You can also contact our support team for personalized sizing assistance."
      }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, net banking, and digital wallets (Paytm, PhonePe, Google Pay)."
      },
      {
        q: "Is my payment information secure?",
        a: "Yes! We use industry-standard SSL encryption and PCI-compliant payment gateways. We never store your complete card details."
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes, COD is available for orders within India. A small COD fee may apply depending on your location."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4">
          <Link to="/home">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-6 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            {faqs.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-6 text-primary">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem 
                      key={qIdx} 
                      value={`${idx}-${qIdx}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-16 text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer support team is here to help!
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}