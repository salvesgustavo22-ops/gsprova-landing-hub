import { Section } from '@/components/Section';
import { BarChart3, Target, Users, MessageCircle } from 'lucide-react';

export const NossosDiferenciais = () => {
  const diferenciais = [
    {
      icon: BarChart3,
      title: 'Conteúdos Exclusivos',
      description: 'Baseados na análise das provas oficiais INEP 2022-2024',
    },
    {
      icon: Target,
      title: 'Trilha Personalizada',
      description: 'Foque nos 35% de matemática básica + seus pontos fracos',
    },
    {
      icon: Users,
      title: 'Mentorias Individuais',
      description: 'Acompanhamento direto com especialistas aprovados',
    },
    {
      icon: MessageCircle,
      title: 'Plantões de Dúvidas',
      description: 'Suporte via WhatsApp quando precisar',
    },
  ];

  return (
    <Section variant="neutral" data-testid="section-diferenciais">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#1E3A8A] md:text-4xl">Nossos Diferenciais</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          O que nos torna únicos na preparação para o ENEM
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {diferenciais.map((diferencial, index) => {
          const Icon = diferencial.icon;
          return (
            <div
              key={index}
              className="rounded-2xl border-2 border-[#E5E7EB] bg-white p-8 text-center shadow-lg transition-all duration-300 hover:border-[#FBBF24] hover:shadow-xl"
            >
              <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F59E0B]">
                <Icon className="size-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#1E3A8A]">{diferencial.title}</h3>
              <p className="leading-relaxed text-gray-600">{diferencial.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
