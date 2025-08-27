import { Shield, Lock } from "lucide-react";

export const SecurityIndicators = () => {
  return (
    <div className="flex items-center justify-center gap-6 py-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
      <div className="flex items-center gap-2 text-white/90">
        <Lock className="w-4 h-4" />
        <span className="text-sm font-medium">SSL Seguro</span>
      </div>
      <div className="w-px h-4 bg-white/30"></div>
      <div className="flex items-center gap-2 text-white/90">
        <Shield className="w-4 h-4" />
        <span className="text-sm font-medium">LGPD Compliant</span>
      </div>
      <div className="w-px h-4 bg-white/30"></div>
      <div className="flex items-center gap-2 text-white/90">
        <span className="text-sm font-medium">💳 Pagamento Seguro</span>
      </div>
    </div>
  );
};