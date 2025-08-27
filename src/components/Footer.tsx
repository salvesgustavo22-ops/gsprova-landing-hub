import { Separator } from "@/components/ui/separator";
import { Instagram, MessageCircle, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova Logo" 
              className="w-24 h-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Preparação focada para ENEM e Fuvest. Matemática prática, correção de redação detalhada e trilhas personalizadas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/sobre" className="text-primary hover:text-primary-hover transition-colors">Sobre</a></li>
              <li><a href="/contato" className="text-primary hover:text-primary-hover transition-colors">Contato</a></li>
              <li><a href="/termos" className="text-primary hover:text-primary-hover transition-colors">Termos de Uso</a></li>
              <li><a href="/privacidade" className="text-primary hover:text-primary-hover transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
            <div className="space-y-3">
              <a href="https://wa.me/5511974969036" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors text-sm">
                <MessageCircle className="w-4 h-4" />
                (11) 97496-9036
              </a>
              <a href="https://instagram.com/gsaprova" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors text-sm">
                <Instagram className="w-4 h-4" />
                @gsaprova
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          © 2025 GS Aprova. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};