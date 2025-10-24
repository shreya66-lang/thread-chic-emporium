import { RefreshCw, CheckCircle, Truck, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ReturnPolicyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border border-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <RefreshCw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Easy Returns & Exchange</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Not satisfied? Return within 30 days for a full refund or exchange.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                View Full Policy →
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Return & Exchange Policy</DialogTitle>
                <DialogDescription>
                  We want you to love your Priyasi purchase. If you're not completely satisfied, we're here to help.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    30-Day Return Window
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You have 30 days from the date of delivery to return your item for a full refund or exchange. 
                    Items must be unworn, unwashed, and in original condition with all tags attached.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    Free Return Shipping
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We offer free return shipping on all orders above ₹999. For orders below this amount, 
                    a nominal shipping fee of ₹99 will be deducted from your refund.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    Quick Processing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Once we receive your return, please allow 5-7 business days for processing. 
                    Refunds will be credited to your original payment method within 7-10 business days.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">How to Return:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Contact our support team within 30 days of delivery</li>
                    <li>Pack the item securely in its original packaging</li>
                    <li>Use the prepaid return label we'll send you</li>
                    <li>Drop off at your nearest courier location</li>
                    <li>Track your return and receive updates via email</li>
                  </ol>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">
                    Items Not Eligible for Return:
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                    <li>Items marked as "Final Sale"</li>
                    <li>Products that have been worn, washed, or altered</li>
                    <li>Items without original tags</li>
                    <li>Personalized or custom-made products</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};