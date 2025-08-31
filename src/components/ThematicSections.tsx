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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 relative overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-yellow-500/10"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            As Provas Estão Chegando!
          </h2>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto font-light">
            Preparação específica para ENEM 2025 e Fuvest 2025. Estratégias personalizadas e conteúdo focado no que realmente importa para sua aprovação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {thematicSections.map((section) => (
            <div key={section.id} className="bg-white/90 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300 border border-yellow-200 overflow-hidden rounded-xl hover:bg-white/95">
              {/* Modern Header */}
              <div className="bg-gray-900 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <section.icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed font-light">
                  {section.description}
                </p>
              </div>

              <div className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    Destaques:
                  </h4>
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700 font-light">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to={section.link}>
                  <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold font-montserrat hover:bg-gray-800 transition-all duration-300 group-hover:scale-105 border-2 border-gray-900 hover:border-yellow-400">
                    {section.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-800 mb-4 font-light text-lg">
            Não sabe qual vestibular focar? Vamos te ajudar a escolher a melhor estratégia.
          </p>
          <Link to="/lead-servicos">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold font-montserrat hover:bg-gray-800 transition-all duration-300 border-2 border-gray-900 hover:border-yellow-400 hover:scale-105">
              Falar com nossa equipe
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};