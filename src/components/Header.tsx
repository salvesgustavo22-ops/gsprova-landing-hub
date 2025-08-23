import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/analytics";

export const Header = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Header WhatsApp CTA', 'header');
    
    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">GS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">GS Aprova</h1>
            <p className="text-xs text-muted-foreground">ENEM & Vestibulares</p>
          </div>
        </div>
        
        <Button 
          onClick={handleWhatsAppClick}
          className="btn-hero hidden sm:flex"
        >
          Falar no WhatsApp
        </Button>
      </div>
    </header>
  );
};