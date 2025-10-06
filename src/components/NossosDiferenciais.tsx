import { Section } from "@/components/Section";
import { BarChart3, Target, Users, MessageCircle } from "lucide-react";

export const NossosDiferenciais = () => {
  const diferenciais = [
    {
      icon: BarChart3,
      title: "Conteúdos Exclusivos",
      description: "Baseados na análise das provas oficiais INEP 2022-2024"
    },
    {
      icon: Target,
      title: "Trilha Personalizada",
      description: "Foque nos 35% de matemática básica + seus pontos fracos"
    },
    {
      icon: Users,
      title: "Mentorias Individuais",
      description: "Acompanhamento direto com especialistas aprovados"
    },
    {
      icon: MessageCircle,
      title: "Plantões de Dúvidas",
      description: "Suporte via WhatsApp quando precisar"
    }
  ];

  return (
    <Section variant="neutral" data-testid="section-diferenciais">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
          Nossos Diferenciais
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          O que nos torna únicos na preparação para o ENEM
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {diferenciais.map((diferencial, index) => {
          const Icon = diferencial.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E5E7EB] hover:border-[#FBBF24] hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-[#1E3A8A] mb-3">
                {diferencial.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {diferencial.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
