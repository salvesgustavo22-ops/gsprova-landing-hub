import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ServiceCarousel {
  title: string;
  description: string;
  price: string;
  icon: string;
}

const services: ServiceCarousel[] = [
  {
    title: "Aulas de Matemática",
    description: "Aulas personalizadas focadas nas suas dificuldades específicas em Matemática para ENEM e vestibulares",
    price: "70",
    icon: "📊"
  },
  {
    title: "Correção de Redação", 
    description: "Correção detalhada com feedback personalizado para elevar sua nota de redação no ENEM",
    price: "70",
    icon: "✍️"
  },
  {
    title: "Pacotes Econômicos",
    description: "Planos com desconto especial para quem quer um acompanhamento completo e contínuo",
    price: "250",
    icon: "📚"
  }
];

export const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Header WhatsApp CTA', 'header');
    
    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
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

      {/* Services Carousel */}
      <div className="bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="relative">
            <Card className="card-service">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={prevSlide}
                    className="text-muted-foreground hover:text-primary p-1 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 text-center space-y-3">
                    <div className="text-4xl">{services[currentSlide].icon}</div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {services[currentSlide].title}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      {services[currentSlide].description}
                    </p>
                    <div className="text-accent font-bold text-lg">
                      A partir de R$ {services[currentSlide].price}
                    </div>
                  </div>
                  
                  <button 
                    onClick={nextSlide}
                    className="text-muted-foreground hover:text-primary p-1 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </header>
  );
};