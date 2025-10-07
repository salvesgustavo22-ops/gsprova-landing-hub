import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, PenTool, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { GuiaLeadForm } from "@/components/GuiaLeadForm";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E3A8A] min-h-[75vh] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FBBF24]/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left column: content */}
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-[-0.02em] mb-6">
                Descubra os Temas que Mais Caem no ENEM 2025
              </h1>
              
              <h2 className="text-white/90 text-lg md:text-xl leading-relaxed">
                Baseado na análise das provas oficiais 2022-2024. <span className="text-[#FBBF24] font-bold">35% são matemática básica</span> + nossas apostas exclusivas para 2025
              </h2>
            </div>

            {/* Planos e Guias Oferecidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <Card 
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-[#FBBF24] transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  const materiaisSection = document.getElementById('materiais-exclusivos');
                  if (materiaisSection) {
                    materiaisSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardContent className="p-5">
                  <BookOpen className="w-8 h-8 text-[#FBBF24] mb-3" />
                  <h3 className="text-white font-bold text-lg mb-2">
                    Guias e Materiais
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Guias completos com análises e questões exclusivas
                  </p>
                  <div className="flex items-center text-[#FBBF24] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Ver materiais <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-[#FBBF24] transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  const planosSection = document.getElementById('planos');
                  if (planosSection) {
                    planosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardContent className="p-5">
                  <GraduationCap className="w-8 h-8 text-[#FBBF24] mb-3" />
                  <h3 className="text-white font-bold text-lg mb-2">
                    Cursos e Mentorias
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Aulas, correções, trilhas personalizadas e mentoria individual
                  </p>
                  <div className="flex items-center text-[#FBBF24] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Ver planos <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Proof Cards */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-lg">+900</div>
                  <div className="text-xs opacity-90">alunos atendidos</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-lg">95%</div>
                  <div className="text-xs opacity-90">de aprovação</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <PenTool className="w-6 h-6 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-lg">70/100</div>
                  <div className="text-xs opacity-90">nota média</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right column: Lead Form */}
          <div className="order-1 md:order-2">
            <GuiaLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
