import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFAQInteraction, trackWhatsAppClick } from "@/lib/analytics";

const faqs = [
  {
    question: "As aulas são online ou presenciais?",
    answer: "Oferecemos tanto aulas online quanto presenciais (região de São Paulo). Você pode escolher a modalidade que melhor se adapta à sua rotina e necessidades."
  },
  {
    question: "Como funciona a correção de redação?",
    answer: "Você envia sua redação por WhatsApp ou email, e em até 48h você recebe a correção detalhada com nota, feedback específico por competência e dicas de melhoria personalizadas."
  },
  {
    question: "Quanto tempo demora para receber a correção?",
    answer: "A correção da redação é entregue em até 48 horas. Para aulas, podemos agendar para o mesmo dia ou próximo dia útil."
  },
  {
    question: "O pagamento é seguro?",
    answer: "Sim! Aceitamos Pix (com desconto), cartão de crédito e débito. Todos os pagamentos são processados com segurança através de certificação SSL e seguimos rigorosamente a LGPD para proteção dos seus dados."
  },
  {
    question: "Meus dados pessoais ficam seguros?",
    answer: "Absolutamente! Seguimos a Lei Geral de Proteção de Dados (LGPD). Seus dados são criptografados, nunca compartilhados com terceiros e usados apenas para prestação dos nossos serviços educacionais."
  },
  {
    question: "Posso experimentar uma aula antes de fechar pacote?",
    answer: "Sim! Agende uma aula-pocket gratuitamente e conheça nossa metodologia de ensino personalizada antes de escolher um pacote."
  }
];

export const FAQ = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto font-light">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-0 overflow-hidden"
              >
                <AccordionTrigger 
                  className="text-left font-semibold hover:no-underline hover:text-white text-white/95 px-6 py-4"
                  onClick={() => trackFAQInteraction(faq.question, 'open')}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 leading-relaxed px-6 pb-6 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center mt-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span>🛡️</span>
            <p className="text-lg font-semibold text-white">Ainda tem dúvidas?</p>
          </div>
          <p className="text-sm text-white/80 mb-4 font-light">
            Atendimento seguro e confidencial via WhatsApp
          </p>
          <button 
            onClick={() => {
              trackWhatsAppClick('faq_support_cta');
              const message = encodeURIComponent("Oi! Tenho algumas dúvidas sobre os serviços. Vim pelo site GS Aprova.");
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