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
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Preparação Específica para Cada Vestibular
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estratégias personalizadas para ENEM 2025 e Fuvest 2025. Conteúdo focado no que realmente importa para sua aprovação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {thematicSections.map((section) => (
            <Card key={section.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {section.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-white/90 text-base leading-relaxed">
                  {section.description}
                </CardDescription>
              </div>

              <CardContent className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Destaques:
                  </h4>
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to={section.link}>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform duration-300"
                    size="lg"
                  >
                    {section.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não sabe qual vestibular focar? Vamos te ajudar a escolher a melhor estratégia.
          </p>
          <Link to="/lead-servicos">
            <Button variant="outline" size="lg" className="px-8">
              Falar com nossa equipe
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};