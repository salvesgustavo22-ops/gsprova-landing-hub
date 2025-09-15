import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Início", path: "/" },
    { name: "ENEM 2025", path: "/enem-2025" },
    { name: "Fuvest 2025", path: "/fuvest-2025" },
    { name: "Portal de Redações", path: "/portal-aluno" },
    { name: "Matemática Online", path: "/#matematica" },
    { name: "Correção de Redação", path: "/#redacao" },
    { name: "Planos", path: "/#planos" },
    { name: "Depoimentos", path: "/#depoimentos" },
    { name: "FAQ", path: "/#faq" },
    { name: "Contato", path: "/contato" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova" 
              className="h-8 w-auto"
              width="64"
              height="32"
            />
            <span className="text-foreground font-bold text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Curso GS Aprova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => {
                  const message = encodeURIComponent("Oi, quero me inscrever no GS Aprova. Vim pelo site.");
                  window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
                }}
                className="bg-background border border-muted-foreground/40 text-foreground hover:bg-muted px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '600'}}
              >
                Inscreva-se
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
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