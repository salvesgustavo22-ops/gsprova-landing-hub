import { Button } from "@/components/ui/button";
import { Clock, Target, Trophy } from "lucide-react";

export const FinalCTA = () => {
  const handleCTAClick = () => {
    const message = encodeURIComponent("Oi, não quero perder tempo! Quero começar hoje mesmo. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 relative overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-yellow-500/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
            As provas estão chegando.<br />
            <span className="text-gray-800">Não perca tempo com excesso de conteúdo.</span>
          </h2>
          
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Foque no que garante pontos. Comece hoje mesmo sua preparação direcionada.
          </p>

          <div className="space-y-4">
            <button 
              onClick={handleCTAClick}
              className="bg-gray-900 text-white px-12 py-6 rounded-xl text-xl font-semibold font-montserrat hover:bg-gray-800 transition-all duration-300 border-2 border-gray-900 hover:border-yellow-600 hover:scale-105"
            >
              Começar hoje mesmo
            </button>
            
            <p className="text-sm text-gray-700 font-light">
              ⚡ Contato rápido e objetivo • 💯 Metodologia comprovada • 🎯 Foco no que importa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};