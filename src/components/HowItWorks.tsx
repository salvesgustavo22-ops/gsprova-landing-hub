import { UserPlus, Route, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackWhatsAppClick, trackPageSection } from '@/lib/analytics';

const steps = [
  {
    icon: UserPlus,
    title: '1. Fale conosco',
    description:
      'Entre em contato para solicitar o tipo de serviço desejado, nos contando um pouco mais da sua necessidade',
  },
  {
    icon: Route,
    title: '2. Diagnóstico',
    description:
      'Nossa equipe entrará em contato para entender melhor a necessidade para montar um plano personalizado para seu serviço',
  },
  {
    icon: TrendingUp,
    title: '3. Aceite',
    description: 'Nossa equipe enviará uma proposta a ser aprovada',
  },
  {
    icon: UserPlus,
    title: '4. Hora de aprender',
    description: 'Vamos embarcar juntos no seu processo de aprendizado',
  },
];

export const HowItWorks = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Como Funciona?</h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
            Processo simples e direto para você começar a estudar hoje mesmo
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 z-0 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-white/30 to-transparent md:block"></div>
                )}

                {/* Icon Circle */}
                <div className="relative z-10 inline-flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="size-8 text-white" />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>

              <p className="font-light leading-relaxed text-white/80">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Redesigned Success Box */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-xl border border-white/20 bg-white/10 p-8 text-center shadow-xl backdrop-blur-md">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-4 py-2">
                <div className="size-3 rounded-full bg-white"></div>
                <span className="text-sm font-medium text-white">Pagamentos Seguros</span>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-4 py-2">
                <div className="size-3 rounded-full bg-white"></div>
                <span className="text-sm font-medium text-white">Método Testado</span>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-4 py-2">
                <div className="size-3 rounded-full bg-white"></div>
                <span className="text-sm font-medium text-white">Resultados Comprovados</span>
              </div>
            </div>

            <button
              onClick={() => {
                trackWhatsAppClick('how_it_works_cta', 'whatsapp_direct');
                const message = encodeURIComponent(
                  'Oi, quero começar agora meus estudos. Vim pelo site GS Aprova.'
                );
                window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
              }}
              className="btn-modern px-8 py-6 text-lg"
            >
              Falar com a equipe agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
