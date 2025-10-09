import { Button } from '@/components/ui/button';
import gsAprovaLogo from '@/assets/gs-aprova-logo.png';

export const Header = () => {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary py-2 text-center text-sm text-white">
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

      <header className="border-b border-primary/10 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img src={gsAprovaLogo} alt="GS Aprova Logo" className="size-12" />
            <div>
              <h1 className="text-xl font-bold text-primary">GS Aprova</h1>
              <p className="text-xs text-primary/70">ENEM & Vestibulares</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => (window.location.href = '/contato')}
              className="bg-accent px-4 py-2 font-bold text-primary shadow-lg hover:bg-accent/90"
            >
              Estudo conosco
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/auth')}
              className="border-primary px-4 py-2 text-primary hover:bg-primary/5"
            >
              Admin
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
