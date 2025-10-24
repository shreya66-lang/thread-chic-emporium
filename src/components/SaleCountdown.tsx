import { useState, useEffect } from "react";
import { Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SaleCountdownProps {
  endDate: Date;
  label?: string;
}

export const SaleCountdown = ({ endDate, label = "Sale Ends In" }: SaleCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white p-4 rounded-lg">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Zap className="w-5 h-5 animate-pulse" />
        <span className="font-bold text-sm uppercase tracking-wider">{label}</span>
      </div>
      
      <div className="flex items-center justify-center gap-2">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-2xl font-bold">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-2xl font-bold">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-2xl font-bold">:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
      <span className="text-2xl font-bold tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs mt-1 opacity-90">{label}</span>
  </div>
);

interface LimitedStockIndicatorProps {
  stock: number;
  threshold?: number;
}

export const LimitedStockIndicator = ({ stock, threshold = 10 }: LimitedStockIndicatorProps) => {
  if (stock > threshold) return null;

  const urgencyLevel = stock <= 3 ? "high" : stock <= 7 ? "medium" : "low";
  
  const colors = {
    high: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300",
    medium: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300",
    low: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900 text-yellow-700 dark:text-yellow-300"
  };

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border ${colors[urgencyLevel]}`}>
      <Clock className="w-4 h-4 flex-shrink-0" />
      <div className="text-sm">
        <span className="font-semibold">Only {stock} left in stock!</span>
        <p className="text-xs opacity-80 mt-0.5">Order soon before it's gone</p>
      </div>
    </div>
  );
};