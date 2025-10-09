import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Calculator, BookOpen, Route, Star } from 'lucide-react';
import { trackPageSection } from '@/lib/analytics';

export default function Fuvest2025() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Fuvest 2025: Estratégias e preparação completa | GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Prepare-se para a Fuvest 2025 com estratégias específicas de matemática, redação e leituras obrigatórias. Monte sua trilha personalizada de estudos.'
      );
    }

    trackPageSection('fuvest_2025_page', 'view');
  }, []);

  const mathStrategies = [
    {
      title: 'Interpretação de Problemas',
      description: 'Como decifrar enunciados complexos da Fuvest',
      tips: ['Identifique dados implícitos', 'Desenhe diagramas', 'Relacione com conceitos'],
    },
    {
      title: 'Questões Discursivas',
      description: 'Estrutura de respostas que garantem nota máxima',
      tips: ['Demonstre raciocínio', 'Justifique cada passo', 'Seja claro e objetivo'],
    },
    {
      title: 'Geometria Avançada',
      description: 'Tópicos específicos que a Fuvest cobra',
      tips: ['Geometria analítica', 'Trigonometria', 'Lugares geométricos'],
    },
  ];

  const essayTopics = [
    {
      aspect: 'Clareza',
      description: 'Ideias organizadas de forma lógica e sequencial',
    },
    {
      aspect: 'Coesão',
      description: 'Uso correto de conectivos e referências',
    },
    {
      aspect: 'Repertório Literário',
      description: 'Citações adequadas das obras obrigatórias',
    },
    {
      aspect: 'Norma Culta',
      description: 'Domínio da gramática e ortografia',
    },
  ];

  const requiredBooks = [
    'O Cortiço - Aluísio Azevedo',
    'Minha luta - Ruy Castro',
    'Angústia - Graciliano Ramos',
    'Quarto de despejo - Carolina Maria de Jesus',
    'Romanceiro da Inconfidência - Cecília Meireles',
    'Mayombe - Pepetela',
    'Campo Geral - Guimarães Rosa',
    'Alguma Poesia - Carlos Drummond de Andrade',
  ];

  const handleTrilhaCTA = () => {
    trackPageSection('fuvest_2025_trilha', 'click');
    window.location.href = '/lead-servicos?service=trilha-personalizada';
  };

  return (
    <div className="section-modern min-h-screen">
      <div className="section-content">
        <Navigation />

        <main>
          {/* Hero Section */}
          <section className="section-modern py-16 lg:py-24">
            <div className="section-content container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <Badge
                  className="mb-4 bg-accent font-semibold text-accent-dark-text"
                  variant="secondary"
                >
                  FUVEST 2025
                </Badge>

                <h1 className="mb-6 text-3xl font-bold leading-tight text-white lg:text-5xl">
                  Fuvest 2025:
                  <br />
                  <span className="text-accent">A preparação que aprova</span>
                </h1>

                <p className="mb-8 text-xl font-light leading-relaxed text-white/90">
                  Estratégias específicas para a Fuvest, desde matemática discursiva até redação com
                  repertório literário. Monte sua trilha personalizada e se prepare de forma
                  direcionada.
                </p>

                <Button onClick={handleTrilhaCTA} className="btn-yellow px-8 py-6 text-lg">
                  Montar Minha Trilha para a Fuvest
                </Button>
              </div>
            </div>
          </section>

          {/* Math Strategies Section */}
          <section className="section-modern py-16 lg:py-20">
            <div className="section-content container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  <Calculator className="mr-3 inline-block text-white" size={36} />
                  Estratégias Matemáticas Fuvest
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
                  A Fuvest tem características únicas. Aprenda como abordar cada tipo de questão
                  para maximizar sua pontuação.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {mathStrategies.map((strategy, index) => (
                  <div key={index} className="card-navy p-6 transition-shadow hover:shadow-lg">
                    <div className="mb-4">
                      <h3 className="flex items-center text-xl font-semibold text-white">
                        <Star className="mr-2 text-accent" size={20} />
                        {strategy.title}
                      </h3>
                    </div>
                    <p className="mb-4 font-light text-white/80">{strategy.description}</p>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-center text-sm font-light text-white/80"
                        >
                          <div className="mr-2 size-2 rounded-full bg-accent"></div>
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
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  <BookOpen className="mr-3 inline-block text-white" size={36} />
                  Redação Fuvest: O que é avaliado
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
                  A redação da Fuvest tem critérios específicos. Entenda cada aspecto avaliado para
                  construir textos nota máxima.
                </p>
              </div>

              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {essayTopics.map((topic, index) => (
                  <div key={index} className="card-navy p-6 text-center">
                    <h3 className="mb-4 text-lg font-semibold text-accent">{topic.aspect}</h3>
                    <p className="text-sm font-light text-white/80">{topic.description}</p>
                  </div>
                ))}
              </div>

              {/* Required Books */}
              <div className="mx-auto max-w-4xl">
                <h3 className="mb-8 text-center text-2xl font-bold text-white">
                  Leituras Obrigatórias Fuvest 2025
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <div className="mx-auto max-w-3xl">
                <Route className="mx-auto mb-6 text-accent" size={64} />

                <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
                  Cada vestibular tem suas particularidades
                </h2>

                <p className="mb-8 text-xl font-light leading-relaxed text-white/90">
                  A Fuvest exige preparação específica e direcionada. Monte uma trilha personalizada
                  que considera suas dificuldades, tempo disponível e objetivos. Tenha um plano que
                  realmente funciona.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button onClick={handleTrilhaCTA} className="btn-yellow px-10 py-6 text-lg">
                    <Route className="mr-2" size={20} />
                    Montar Minha Trilha Personalizada
                  </Button>

                  <p className="text-sm font-light text-white/70">
                    ✓ Cronograma adaptado • ✓ Foco nos seus pontos fracos • ✓ Acompanhamento
                    contínuo
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
