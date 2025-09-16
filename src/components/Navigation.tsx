import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BUSINESS_WHATSAPP_URL, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Simplified navigation items (only essentials)
  const navigationItems = [
    { name: "Início", path: "/" },
    { name: "Planos e Preços", path: "/#pricing" },
    { name: "Correção de Redação", path: "/#essay" },
    { name: "Contato", path: "/contato" }
  ];

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('header_whatsapp_click', 'navigation');
    const message = encodeURIComponent("Quero minha aula");
    window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
  };

  const handlePromoBadgeClick = () => {
    trackWhatsAppClick('header_badge_click', 'promo');
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      aria-label="Principal" 
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur border-b transition-shadow ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova" 
              className="h-8 w-auto"
              width="64"
              height="32"
            />
            <span className="text-foreground font-bold text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>
              GS Aprova
            </span>
          </Link>

          {/* Center/Right: Nav + Promo + CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Promo badge */}
            <button
              onClick={handlePromoBadgeClick}
              className="text-sm font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ver promoção de até 30% de desconto"
            >
              ATÉ 30% OFF até 30/09
            </button>

            {/* WhatsApp CTA */}
            <Button
              onClick={handleWhatsAppClick}
              className="rounded-xl px-4 py-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow focus-visible:ring-2 focus-visible:ring-primary"
            >
              Falar no WhatsApp
            </Button>
          </div>

          {/* Mobile condensed actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handlePromoBadgeClick}
              className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Ver promoção"
            >
              30% OFF até 30/09
            </button>
            <Button
              onClick={handleWhatsAppClick}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow focus-visible:ring-2 focus-visible:ring-primary"
            >
              WhatsApp
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="ml-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded ${
                    location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};