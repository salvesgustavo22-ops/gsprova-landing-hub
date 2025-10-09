import { BookOpen, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const thematicSections = [
  {
    id: 'enem-2025',
    title: 'ENEM 2025',
    description:
      'Estratégias completas para dominar o ENEM 2025. Matemática focada no que mais cai, estrutura de redação e dicas práticas.',
    icon: Target,
    link: '/enem-2025',
    highlights: ['Funções e Estatística', 'Estrutura de Redação', 'Simulados Direcionados'],
    buttonText: 'Ver estratégias ENEM',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 'fuvest-2025',
    title: 'Fuvest 2025',
    description:
      'Preparação específica para a Fuvest 2025. Matemática discursiva, redação com repertório literário e leituras obrigatórias.',
    icon: BookOpen,
    link: '/fuvest-2025',
    highlights: ['Questões Discursivas', 'Repertório Literário', 'Leituras Obrigatórias'],
    buttonText: 'Ver estratégias Fuvest',
    gradient: 'from-green-500 to-teal-600',
  },
];

export const ThematicSections = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Preparação Específica para Cada Vestibular
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-light text-white/90">
            Estratégias personalizadas para ENEM 2025 e Fuvest 2025. Conteúdo focado no que
            realmente importa para sua aprovação.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {thematicSections.map(section => (
            <div
              key={section.id}
              className="card-navy group overflow-hidden rounded-xl border-0 transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-lg bg-white/20 p-3">
                    <section.icon className="size-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>
                <p className="text-base font-light leading-relaxed text-white/90">
                  {section.description}
                </p>
              </div>

              <div className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                    <TrendingUp className="size-4 text-white" />
                    Destaques:
                  </h4>
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 font-light text-white/80">
                        <div className="size-1.5 rounded-full bg-white"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to={section.link}>
                  <button className="btn-yellow w-full transition-transform duration-300 group-hover:scale-105">
                    {section.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 font-light text-white/80">
            Não sabe qual vestibular focar? Vamos te ajudar a escolher a melhor estratégia.
          </p>
          <Link to="/lead-servicos">
            <button className="btn-yellow px-8">Falar com nossa equipe</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
