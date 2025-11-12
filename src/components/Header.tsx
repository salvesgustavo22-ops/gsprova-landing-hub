import { Button } from '@/components/ui/button';
import novoLogo from '@/assets/novo-logo-gsaprova-novembro-2.jpg';

export const Header = () => {
  return (
    <>
      {/* Top Banner - Navy blue */}
      <div className="bg-primary py-2 text-center text-sm text-primary-foreground">
        <div className="flex items-center justify-center gap-4">
          <span className="font-medium">
            🎯 Prepare-se para o ENEM 2025 com quem entende do assunto!
          </span>
          <div className="hidden items-center gap-2 text-xs sm:flex">
            <span>🔒</span>
            <span>Site Seguro</span>
          </div>
        </div>
      </div>

      <header className="border-b border-border bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img src={novoLogo} alt="GS Aprova - Correção de redação e preparação para ENEM 2025" className="h-16 w-auto" />
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => (window.location.href = '/contato')}
              className="btn-accent rounded-lg px-6 py-2.5 font-bold"
            >
              Estudo conosco
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/auth')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Admin
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
