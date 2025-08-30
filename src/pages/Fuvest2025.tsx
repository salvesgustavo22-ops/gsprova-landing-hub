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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-primary" variant="secondary">
                FUVEST 2025
              </Badge>
              
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                Fuvest 2025:<br />
                <span className="text-accent">A preparação que aprova</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Estratégias específicas para a Fuvest, desde matemática discursiva até redação com repertório literário. Monte sua trilha personalizada e se prepare de forma direcionada.
              </p>

              <Button 
                onClick={handleTrilhaCTA}
                className="btn-hero bg-accent hover:bg-accent/90 text-primary text-lg px-8 py-6"
              >
                Montar Minha Trilha para a Fuvest
              </Button>
            </div>
          </div>
        </section>

        {/* Math Strategies Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <Calculator className="inline-block mr-3 text-primary" size={36} />
                Estratégias Matemáticas Fuvest
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A Fuvest tem características únicas. Aprenda como abordar cada tipo de questão para maximizar sua pontuação.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mathStrategies.map((strategy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Star className="mr-2 text-accent" size={20} />
                      {strategy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{strategy.description}</p>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Essay Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <BookOpen className="inline-block mr-3 text-primary" size={36} />
                Redação Fuvest: O que é avaliado
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A redação da Fuvest tem critérios específicos. Entenda cada aspecto avaliado para construir textos nota máxima.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {essayTopics.map((topic, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{topic.aspect}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Required Books */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Leituras Obrigatórias Fuvest 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredBooks.map((book, index) => (
                  <Card key={index} className="border-l-4 border-l-accent">
                    <CardContent className="pt-4">
                      <p className="font-medium">{book}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Route className="mx-auto mb-6 text-accent" size={64} />
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Cada vestibular tem suas particularidades
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                A Fuvest exige preparação específica e direcionada. Monte uma trilha personalizada que considera suas dificuldades, tempo disponível e objetivos. Tenha um plano que realmente funciona.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleTrilhaCTA}
                  className="btn-hero bg-accent hover:bg-accent/90 text-primary text-lg px-10 py-6"
                >
                  <Route className="mr-2" size={20} />
                  Montar Minha Trilha Personalizada
                </Button>
                
                <p className="text-sm text-white/70">
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
  );
}