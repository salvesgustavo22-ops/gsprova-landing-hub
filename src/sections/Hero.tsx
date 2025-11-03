import { Card, CardContent } from '@/components/ui/card';
import { Target, Award, TrendingUp, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { GuiaLeadForm } from '@/components/GuiaLeadForm';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E3A8A]">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FBBF24]/20 via-transparent to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left column: content */}
          <div className="order-2 space-y-6 md:order-1">
            <div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-6xl">
                Correção de Redação para o ENEM 2025
              </h1>

              <h2 className="text-lg leading-relaxed text-white/90 md:text-xl">
                Baseado na análise das provas oficiais 2022-2024.{' '}
                <span className="font-bold text-[#FBBF24]">35% são matemática básica</span> + nossas
                apostas exclusivas para 2025
              </h2>
            </div>

            {/* Planos e Guias Oferecidos */}
            <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card
                className="group cursor-pointer border-2 border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#FBBF24]"
                onClick={() => {
                  const materiaisSection = document.getElementById('materiais-exclusivos');
                  if (materiaisSection) {
                    materiaisSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardContent className="p-5">
                  <BookOpen className="mb-3 size-8 text-[#FBBF24]" />
                  <h3 className="mb-2 text-lg font-bold text-white">Guias e Materiais</h3>
                  <p className="mb-3 text-sm text-white/80">
                    Guias completos com análises e questões exclusivas
                  </p>
                  <div className="flex items-center text-sm font-semibold text-[#FBBF24] transition-transform group-hover:translate-x-1">
                    Ver materiais <ArrowRight className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group cursor-pointer border-2 border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#FBBF24]"
                onClick={() => {
                  const planosSection = document.getElementById('planos');
                  if (planosSection) {
                    planosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardContent className="p-5">
                  <GraduationCap className="mb-3 size-8 text-[#FBBF24]" />
                  <h3 className="mb-2 text-lg font-bold text-white">Cursos e Mentorias</h3>
                  <p className="mb-3 text-sm text-white/80">
                    Aulas, correções, trilhas personalizadas e mentoria individual
                  </p>
                  <div className="flex items-center text-sm font-semibold text-[#FBBF24] transition-transform group-hover:translate-x-1">
                    Ver planos <ArrowRight className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Proof Cards */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Card className="border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Target className="mx-auto mb-2 size-6 opacity-90" />
                  <div className="text-sm font-bold">Foco no que</div>
                  <div className="text-xs opacity-90">realmente cai</div>
                </CardContent>
              </Card>

              <Card className="border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Award className="mx-auto mb-2 size-6 opacity-90" />
                  <div className="text-sm font-bold">Vestibulares</div>
                  <div className="text-xs opacity-90">e Concursos</div>
                </CardContent>
              </Card>

              <Card className="border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="mx-auto mb-2 size-6 opacity-90" />
                  <div className="text-sm font-bold">Trilhas</div>
                  <div className="text-xs opacity-90">personalizadas</div>
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
