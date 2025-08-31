import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Calculator, BookOpen, Route, Target, Star } from "lucide-react";
import { trackPageSection } from "@/lib/analytics";

export default function Fuvest2025() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Fuvest 2025: Estratégias e preparação completa | GS Aprova";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Prepare-se para a Fuvest 2025 com estratégias específicas de matemática, redação e leituras obrigatórias. Monte sua trilha personalizada de estudos.");
    }

    trackPageSection('fuvest_2025_page', 'view');
  }, []);

  const mathStrategies = [
    {
      title: "Interpretação de Problemas",
      description: "Como decifrar enunciados complexos da Fuvest",
      tips: ["Identifique dados implícitos", "Desenhe diagramas", "Relacione com conceitos"]
    },
    {
      title: "Questões Discursivas",
      description: "Estrutura de respostas que garantem nota máxima",
      tips: ["Demonstre raciocínio", "Justifique cada passo", "Seja claro e objetivo"]
    },
    {
      title: "Geometria Avançada",
      description: "Tópicos específicos que a Fuvest cobra",
      tips: ["Geometria analítica", "Trigonometria", "Lugares geométricos"]
    }
  ];

  const essayTopics = [
    {
      aspect: "Clareza",
      description: "Ideias organizadas de forma lógica e sequencial"
    },
    {
      aspect: "Coesão",
      description: "Uso correto de conectivos e referências"
    },
    {
      aspect: "Repertório Literário",
      description: "Citações adequadas das obras obrigatórias"
    },
    {
      aspect: "Norma Culta",
      description: "Domínio da gramática e ortografia"
    }
  ];

  const requiredBooks = [
    "O Cortiço - Aluísio Azevedo",
    "Minha luta - Ruy Castro",
    "Angústia - Graciliano Ramos",
    "Quarto de despejo - Carolina Maria de Jesus",
    "Romanceiro da Inconfidência - Cecília Meireles",
    "Mayombe - Pepetela",
    "Campo Geral - Guimarães Rosa",
    "Alguma Poesia - Carlos Drummond de Andrade"
  ];

  const handleTrilhaCTA = () => {
    trackPageSection('fuvest_2025_trilha', 'click');
    window.location.href = '/lead-servicos?service=trilha-personalizada';
  };

  return (
    <div className="min-h-screen section-modern">
      <div className="section-content">
        <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="section-modern py-16 lg:py-24">
          <div className="section-content container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-dark-text font-semibold" variant="secondary">
                FUVEST 2025
              </Badge>
              
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                Fuvest 2025:<br />
                <span className="text-accent">A preparação que aprova</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed font-light">
                Estratégias específicas para a Fuvest, desde matemática discursiva até redação com repertório literário. Monte sua trilha personalizada e se prepare de forma direcionada.
              </p>

              <Button 
                onClick={handleTrilhaCTA}
                className="btn-yellow text-lg px-8 py-6"
              >
                Montar Minha Trilha para a Fuvest
              </Button>
            </div>
          </div>
        </section>

        {/* Math Strategies Section */}
        <section className="section-modern py-16 lg:py-20">
          <div className="section-content container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                <Calculator className="inline-block mr-3 text-white" size={36} />
                Estratégias Matemáticas Fuvest
              </h2>
              <p className="text-lg text-white/85 max-w-2xl mx-auto font-light">
                A Fuvest tem características únicas. Aprenda como abordar cada tipo de questão para maximizar sua pontuação.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mathStrategies.map((strategy, index) => (
                <div key={index} className="card-navy hover:shadow-lg transition-shadow p-6">
                  <div className="mb-4">
                    <h3 className="text-xl flex items-center text-white font-semibold">
                      <Star className="mr-2 text-accent" size={20} />
                      {strategy.title}
                    </h3>
                  </div>
                  <p className="text-white/80 mb-4 font-light">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center text-sm text-white/80 font-light">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Essay Section */}
        <section className="section-modern py-16 lg:py-20">
          <div className="section-content container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                <BookOpen className="inline-block mr-3 text-white" size={36} />
                Redação Fuvest: O que é avaliado
              </h2>
              <p className="text-lg text-white/85 max-w-2xl mx-auto font-light">
                A redação da Fuvest tem critérios específicos. Entenda cada aspecto avaliado para construir textos nota máxima.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {essayTopics.map((topic, index) => (
                <div key={index} className="card-navy text-center p-6">
                  <h3 className="text-lg text-accent font-semibold mb-4">{topic.aspect}</h3>
                  <p className="text-sm text-white/80 font-light">{topic.description}</p>
                </div>
              ))}
            </div>

            {/* Required Books */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Leituras Obrigatórias Fuvest 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredBooks.map((book, index) => (
                  <div key={index} className="card-navy border-l-4 border-l-accent p-4">
                    <p className="font-medium text-white">{book}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-modern py-16 lg:py-20">
          <div className="section-content container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Route className="mx-auto mb-6 text-accent" size={64} />
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Cada vestibular tem suas particularidades
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed font-light">
                A Fuvest exige preparação específica e direcionada. Monte uma trilha personalizada que considera suas dificuldades, tempo disponível e objetivos. Tenha um plano que realmente funciona.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleTrilhaCTA}
                  className="btn-yellow text-lg px-10 py-6"
                >
                  <Route className="mr-2" size={20} />
                  Montar Minha Trilha Personalizada
                </Button>
                
                <p className="text-sm text-white/70 font-light">
                  ✓ Cronograma adaptado • ✓ Foco nos seus pontos fracos • ✓ Acompanhamento contínuo
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />
      </div>
    </div>
  );
}