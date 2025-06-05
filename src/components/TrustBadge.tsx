import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface TrustBadgeProps {
  Icon: LucideIcon;
  text: string;
}

const TrustBadge = ({ Icon, text }: TrustBadgeProps) => (
  <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg shadow-md">
    <Icon className="h-10 w-10 text-primary mb-2" />
    <p className="text-sm font-medium">{text}</p>
  </div>
);

export const TrustBadgesSection = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <TrustBadge Icon={ShieldCheck} text="Secure Checkout" />
    <TrustBadge Icon={Truck} text="Free Shipping on Orders $50+" />
    <TrustBadge Icon={RotateCcw} text="Easy Returns & Exchanges" />
  </div>
);

export default TrustBadge;
