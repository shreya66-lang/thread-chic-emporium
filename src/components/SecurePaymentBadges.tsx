import { Lock, CreditCard, Shield } from "lucide-react";

export const SecurePaymentBadges = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4 text-green-500" />
        <span>Secure Checkout</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">WE ACCEPT</p>
        <div className="flex flex-wrap items-center gap-3">
          {/* Payment method badges */}
          <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border rounded flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium">Visa</span>
          </div>
          <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border rounded flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium">Mastercard</span>
          </div>
          <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border rounded flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">UPI</span>
          </div>
          <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border rounded">
            <span className="text-xs font-medium">Wallets</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
        <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-medium text-green-900 dark:text-green-100">Your payment information is secure</p>
          <p className="text-green-700 dark:text-green-300">We use industry-standard encryption to protect your data.</p>
        </div>
      </div>
    </div>
  );
};