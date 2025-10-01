import { Separator } from "@/components/ui/separator";
import { Instagram, MessageCircle, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#1E3A8A] border-t border-[#FBBF24]/20">
      {/* Removed background image for cleaner dark footer */}
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova Logo" 
              className="w-24 h-auto object-contain mb-4"
            />
            <p className="text-white/90 text-sm leading-relaxed max-w-md">
              Preparação focada para ENEM e Fuvest. Matemática prática, correção de redação detalhada e trilhas personalizadas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-white/80 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="/contato" className="text-white/80 hover:text-white transition-colors">Contato</a></li>
              <li><a href="/terms" className="text-white/80 hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="/privacy" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <a href="https://wa.me/5511974969036" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
                <MessageCircle className="w-4 h-4" />
                (11) 97496-9036
              </a>
              <a href="https://instagram.com/gsaprovamr" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
                <Instagram className="w-4 h-4" />
                @gsaprovamr
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />
        
        {/* Security Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <h4 className="font-semibold mb-3 text-white">Segurança e Confiança</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span>🔒</span>
                <span>SSL Certificado</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span>🛡️</span>
                <span>LGPD Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span>💳</span>
                <span>Pagamentos Seguros</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span>📋</span>
                <span>Garantia de 7 dias</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-white">Formas de Pagamento</h4>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              <span className="bg-white/10 px-3 py-1 rounded-full">PIX (com desconto)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Cartão até 6x</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Débito</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="text-center text-sm text-white/70">
          © 2025 GS Aprova. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};