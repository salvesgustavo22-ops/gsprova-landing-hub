import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL, WHATSAPP_MESSAGES } from "@/lib/constants";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    trackEvent('cta_click', { label: 'Header - Começar agora' });
    const redacaoSection = document.getElementById('redacao');
    if (redacaoSection) {
      redacaoSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback to WhatsApp if section doesn't exist
      const message = encodeURIComponent(WHATSAPP_MESSAGES.heroEnem);
      window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
    }
  };

  const handleNavClick = (label: string) => {
    trackEvent('nav_click', { label });
  };

  return (
    <nav 
      aria-label="Menu principal"
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b transition-all duration-200 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova - Preparação para ENEM e Vestibulares" 
              className="h-8 w-auto"
              width="64"
              height="32"
            />
            <span className="text-foreground font-bold text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>
              GS Aprova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="/#matematica" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => handleNavClick('Matemática')}
              aria-label="Ir para seção de Matemática"
            >
              Matemática
            </a>
            <a 
              href="/#redacao" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => handleNavClick('Redação')}
              aria-label="Ir para seção de Redação"
            >
              Redação
            </a>
            <a 
              href="/#simulados" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => handleNavClick('Simulados')}
              aria-label="Ir para seção de Simulados"
            >
              Simulados
            </a>
            <a 
              href="/#pricing" 
              className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
              onClick={() => handleNavClick('Planos e Preços')}
              aria-label="Ir para Planos e Preços"
            >
              Planos e Preços
            </a>

            {/* Primary CTA */}
            <Button
              onClick={handleCTAClick}
              className="rounded-xl px-6 py-2 font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Começar agora seus estudos"
            >
              Começar agora
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={handleCTAClick}
              size="sm"
              className="rounded-lg px-3 py-1.5 text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
              aria-label="Começar agora seus estudos"
            >
              Começar agora
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t bg-background/95 backdrop-blur">
            <div className="flex flex-col space-y-3 pt-4">
              <a 
                href="/#matematica" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => {
                  handleNavClick('Matemática');
                  setIsOpen(false);
                }}
              >
                Matemática
              </a>
              <a 
                href="/#redacao" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => {
                  handleNavClick('Redação');
                  setIsOpen(false);
                }}
              >
                Redação
              </a>
              <a 
                href="/#simulados" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => {
                  handleNavClick('Simulados');
                  setIsOpen(false);
                }}
              >
                Simulados
              </a>
              <a 
                href="/#pricing" 
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors py-2"
                onClick={() => {
                  handleNavClick('Planos e Preços');
                  setIsOpen(false);
                }}
              >
                Planos e Preços
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};