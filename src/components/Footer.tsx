import { Separator } from '@/components/ui/separator';
import { Instagram, MessageCircle } from 'lucide-react';
import logo from '@/assets/novo-logo-gsaprova-novembro-2.jpg';

export const Footer = () => {
  return (
    <footer className="relative border-t border-[#FBBF24]/20 bg-[#1E3A8A]">
      {/* Removed background image for cleaner dark footer */}

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="GS Aprova Logo"
              className="mb-4 h-auto w-32 object-contain"
            />
            <p className="max-w-md text-sm leading-relaxed text-white/90">
              Preparação focada para ENEM e Fuvest. Matemática prática, correção de redação
              detalhada e trilhas personalizadas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-white/80 transition-colors hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/contato" className="text-white/80 transition-colors hover:text-white">
                  Contato
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/80 transition-colors hover:text-white">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white/80 transition-colors hover:text-white">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5511974969036"
                className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4" />
                (11) 97496-9036
              </a>
              <a
                href="https://instagram.com/gsaprovamr"
                className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Instagram className="size-4" />
                @gsaprovamr
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Security Section */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold text-white">Segurança e Confiança</h4>
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
            <h4 className="mb-3 font-semibold text-white">Formas de Pagamento</h4>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              <span className="rounded-full bg-white/10 px-3 py-1">PIX (com desconto)</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Cartão até 6x</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Débito</span>
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
