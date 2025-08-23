import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">GS Aprova</h3>
                <p className="text-xs text-muted-foreground">ENEM & Vestibulares</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Preparação focada e objetiva para ENEM e vestibulares. 
              Aulas de Matemática e correções de Redação com metodologia comprovada.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Aulas de Matemática</li>
              <li>Correção de Redação</li>
              <li>Pacotes Personalizados</li>
              <li>Acompanhamento ENEM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📱 WhatsApp: (11) 99999-9999</li>
              <li>📧 contato@gsaprova.com.br</li>
              <li>📍 São Paulo, SP</li>
              <li>🕒 Seg-Sex: 8h às 20h</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Cancelamento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © 2024 GS Aprova. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Pagamento seguro</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-primary/10 rounded flex items-center justify-center text-xs">PIX</div>
              <div className="w-8 h-5 bg-success/10 rounded flex items-center justify-center text-xs">💳</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};