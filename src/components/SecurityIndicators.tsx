import { Shield, Lock } from 'lucide-react';

export const SecurityIndicators = () => {
  return (
    <div className="flex items-center justify-center gap-6 rounded-lg border border-white/20 bg-white/50 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-white/90">
        <Lock className="size-4" />
        <span className="text-sm font-medium">SSL Seguro</span>
      </div>
      <div className="h-4 w-px bg-white/30"></div>
      <div className="flex items-center gap-2 text-white/90">
        <Shield className="size-4" />
        <span className="text-sm font-medium">LGPD Compliant</span>
      </div>
      <div className="h-4 w-px bg-white/30"></div>
      <div className="flex items-center gap-2 text-white/90">
        <span className="text-sm font-medium">💳 Pagamento Seguro</span>
      </div>
    </div>
  );
};
