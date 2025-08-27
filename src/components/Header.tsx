import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import gsAprovaLogo from "@/assets/gs-aprova-logo.png";

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
  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-white py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-4">
          <span className="font-medium">🎯 Prepare-se para o ENEM 2025 com quem entende do assunto!</span>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span>🔒</span>
            <span>Site Seguro</span>
          </div>
        </div>
      </div>
      
      <header className="bg-white shadow-lg border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={gsAprovaLogo} 
              alt="GS Aprova Logo" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">GS Aprova</h1>
              <p className="text-xs text-primary/70">ENEM & Vestibulares</p>
            </div>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/contato'}
            className="bg-accent hover:bg-accent/90 text-primary font-bold px-6 py-2 shadow-lg"
          >
            Estudo conosco
          </Button>
        </div>
      </header>
    </>
  );
};