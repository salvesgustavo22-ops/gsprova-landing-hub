import { Button } from "@/components/ui/button";
import { Clock, Target, Trophy } from "lucide-react";

export const FinalCTA = () => {
  const handleCTAClick = () => {
    const message = encodeURIComponent("Oi, não quero perder tempo! Quero começar hoje mesmo. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Urgency Icons */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium">Provas chegando</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium">Foco certeiro</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium">Resultados garantidos</span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            As provas estão chegando.<br />
            <span className="text-accent">Não perca tempo com excesso de conteúdo.</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Foque no que garante pontos. Comece hoje mesmo sua preparação direcionada.
          </p>

          <div className="space-y-4">
            <Button 
              onClick={handleCTAClick}
              className="btn-hero text-xl px-12 py-8 bg-accent hover:bg-accent/90 text-primary font-bold shadow-2xl hover:shadow-accent/25 transform hover:scale-105 transition-all duration-300"
            >
              Começar hoje mesmo
            </Button>
            
            <p className="text-sm text-white/70">
              ⚡ Resposta em até 2 horas • 💯 Metodologia comprovada • 🎯 Foco no que importa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};