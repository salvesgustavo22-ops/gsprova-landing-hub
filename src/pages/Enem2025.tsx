import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Calculator, PenTool, BookOpen, Target, CheckCircle } from 'lucide-react';
import { trackPageSection } from '@/lib/analytics';

export default function Enem2025() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'ENEM 2025: Tudo o que você precisa saber para gabaritar | GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Prepare-se para o ENEM 2025 com dicas de matemática, estrutura de redação e estratégias aprovadas. Baixe nosso checklist gratuito com os tópicos que mais caem.'
      );
    }

    trackPageSection('enem_2025_page', 'view');
  }, []);

  const mathTopics = [
    {
      title: 'Funções',
      weight: 'Alto',
      description: 'Função afim, quadrática, exponencial e logarítmica',
    },
    { title: 'Geometria', weight: 'Alto', description: 'Áreas, volumes e relações métricas' },
    { title: 'Estatística', weight: 'Médio', description: 'Média, mediana, moda e gráficos' },
    { title: 'Regra de Três', weight: 'Alto', description: 'Proporcionalidade direta e inversa' },
    { title: 'Porcentagem', weight: 'Alto', description: 'Cálculos financeiros e variações' },
    { title: 'Trigonometria', weight: 'Médio', description: 'Seno, cosseno e aplicações' },
  ];

  const essayStructure = [
    { step: 'Introdução', description: 'Apresentação do tema e tese clara' },
    { step: 'Desenvolvimento 1', description: 'Primeiro argumento com repertório' },
    { step: 'Desenvolvimento 2', description: 'Segundo argumento com dados/exemplos' },
    { step: 'Conclusão', description: 'Retomada da tese e proposta de intervenção' },
  ];

  const handleChecklistCTA = () => {
    trackPageSection('enem_2025_checklist', 'click');
    window.location.href = '/lead-checklist';
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
                  ENEM 2025
                </Badge>

                <h1 className="mb-6 text-3xl font-bold leading-tight text-white lg:text-5xl">
                  Tudo sobre o ENEM 2025:
                  <br />
                  <span className="text-accent">Estratégias que funcionam</span>
                </h1>

                <p className="mb-8 text-xl font-light leading-relaxed text-white/90">
                  Descubra os tópicos de matemática que mais caem, aprenda a estrutura perfeita da
                  redação e baixe nosso checklist completo para não perder nenhum detalhe
                  importante.
                </p>

                <Button onClick={handleChecklistCTA} className="btn-yellow px-8 py-6 text-lg">
                  Baixar Checklist ENEM 2025 Gratuito
                </Button>
              </div>
            </div>
          </section>

          {/* Math Topics Section */}
          <section className="section-modern py-16 lg:py-20">
            <div className="section-content container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  <Calculator className="mr-3 inline-block text-white" size={36} />
                  Matemática no ENEM 2025
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
                  Foque nos tópicos que realmente importam. Estes assuntos representam mais de 70%
                  das questões de matemática.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mathTopics.map((topic, index) => (
                  <div key={index} className="card-navy p-6 transition-shadow hover:shadow-lg">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                        <Badge
                          variant={topic.weight === 'Alto' ? 'default' : 'secondary'}
                          className="bg-accent text-accent-dark-text"
                        >
                          {topic.weight}
                        </Badge>
                      </div>
                    </div>
                    <p className="font-light text-white/80">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Essay Structure Section */}
          <section className="section-modern py-16 lg:py-20">
            <div className="section-content container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  <PenTool className="mr-3 inline-block text-white" size={36} />
                  Estrutura da Redação ENEM
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
                  A fórmula testada e aprovada para conseguir nota máxima na redação do ENEM.
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
                <div className="space-y-6">
                  {essayStructure.map((step, index) => (
                    <div key={index} className="card-navy border-l-4 border-l-accent p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-dark-text">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold text-white">{step.step}</h3>
                          <p className="font-light text-white/80">{step.description}</p>
                        </div>
                      </div>
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
                <Target className="mx-auto mb-6 text-accent" size={64} />

                <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
                  Não estude às cegas para o ENEM 2025
                </h2>

                <p className="mb-8 text-xl font-light leading-relaxed text-white/90">
                  Baixe nosso checklist completo com todos os tópicos essenciais, cronograma de
                  estudos e dicas de redação. Material criado por especialistas que já aprovaram
                  centenas de alunos.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button onClick={handleChecklistCTA} className="btn-yellow px-10 py-6 text-lg">
                    <CheckCircle className="mr-2" size={20} />
                    Baixar Checklist Gratuito
                  </Button>

                  <p className="text-sm font-light text-white/70">
                    ✓ PDF completo • ✓ Cronograma incluso • ✓ Acesso imediato
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
