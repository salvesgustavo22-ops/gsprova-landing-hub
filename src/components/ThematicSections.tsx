import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const thematicSections = [
  {
    id: "enem-2025",
    title: "ENEM 2025",
    description: "Estratégias completas para dominar o ENEM 2025. Matemática focada no que mais cai, estrutura de redação e dicas práticas.",
    icon: Target,
    link: "/enem-2025",
    highlights: [
      "Funções e Estatística",
      "Estrutura de Redação",
      "Simulados Direcionados"
    ],
    buttonText: "Ver estratégias ENEM",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: "fuvest-2025",
    title: "Fuvest 2025", 
    description: "Preparação específica para a Fuvest 2025. Matemática discursiva, redação com repertório literário e leituras obrigatórias.",
    icon: BookOpen,
    link: "/fuvest-2025",
    highlights: [
      "Questões Discursivas",
      "Repertório Literário", 
      "Leituras Obrigatórias"
    ],
    buttonText: "Ver estratégias Fuvest",
    gradient: "from-green-500 to-teal-600"
  }
];

export const ThematicSections = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Preparação Específica para Cada Vestibular
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto font-light">
            Estratégias personalizadas para ENEM 2025 e Fuvest 2025. Conteúdo focado no que realmente importa para sua aprovação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {thematicSections.map((section) => (
            <div key={section.id} className="card-navy group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden rounded-xl">
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <p className="text-white/90 text-base leading-relaxed font-light">
                  {section.description}
                </p>
              </div>

              <div className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-white" />
                    Destaques:
                  </h4>
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80 font-light">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to={section.link}>
                  <button className="btn-yellow w-full group-hover:scale-105 transition-transform duration-300">
                    {section.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-white/80 mb-4 font-light">
            Não sabe qual vestibular focar? Vamos te ajudar a escolher a melhor estratégia.
          </p>
          <Link to="/lead-servicos">
            <button className="btn-yellow px-8">
              Falar com nossa equipe
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};