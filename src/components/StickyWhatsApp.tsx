import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export const StickyWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Sticky WhatsApp CTA', 'sticky');
    
    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-500">
      {!isMinimized ? (
        <div className="bg-success text-success-foreground rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center justify-between p-3 border-b border-success-foreground/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success-foreground/20 rounded-full flex items-center justify-center">
                <MessageCircleIcon className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">GS Aprova</span>
            </div>
            <button 
              onClick={toggleMinimize}
              className="p-1 hover:bg-success-foreground/20 rounded"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-sm mb-3">
              Olá! 👋 Tem dúvidas sobre nossos cursos? Fale conosco agora!
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-success-foreground text-success hover:bg-success-foreground/90"
            >
              Iniciar conversa
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleMinimize}
          className="w-14 h-14 bg-success text-success-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse"
        >
          <MessageCircleIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};