import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackFAQInteraction, trackWhatsAppClick } from '@/lib/analytics';

const faqs = [
  {
    question: 'Como funciona o Curso Intensivo?',
    answer:
      'De 03/10 a 09/11, com aulas diárias (40h/semana), correções semanais e mentorias individuais.',
  },
  {
    question: 'O que está incluso no Material de Revisão?',
    answer: 'Resumos, mapas mentais, listas de exercícios e simulados organizados por tema.',
  },
  {
    question: 'Posso cancelar?',
    answer: 'Sim, você tem 7 dias de garantia com devolução integral.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Parcelamento em até 6x no cartão.',
  },
  {
    question: 'Qual o prazo para entrega das correções?',
    answer: 'Até 5 dias úteis após envio.',
  },
];

export const FAQ = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Perguntas Frequentes</h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border border-white/20 bg-white/10 p-0 backdrop-blur-md"
              >
                <AccordionTrigger
                  className="px-6 py-4 text-left font-semibold text-white/95 hover:text-white hover:no-underline"
                  onClick={() => trackFAQInteraction(faq.question, 'open')}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 font-light leading-relaxed text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span>🛡️</span>
            <p className="text-lg font-semibold text-white">Ainda tem dúvidas?</p>
          </div>
          <p className="mb-4 text-sm font-light text-white/80">
            Atendimento seguro e confidencial via WhatsApp
          </p>
          <button
            onClick={() => {
              trackWhatsAppClick('faq_support_cta');
              const message = encodeURIComponent(
                'Oi! Tenho algumas dúvidas sobre os serviços. Vim pelo site GS Aprova.'
              );
              window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
            }}
            className="btn-modern inline-flex items-center gap-2"
          >
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};
