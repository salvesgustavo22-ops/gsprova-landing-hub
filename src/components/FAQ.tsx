import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funcionam as aulas online?",
    answer: "As aulas são realizadas via Google Meet ou Zoom com compartilhamento de tela, quadro digital e material interativo. Você recebe o link com antecedência e pode gravar a aula para revisar depois."
  },
  {
    question: "Quanto tempo demora para receber a correção da redação?",
    answer: "As correções são entregues em até 24 horas úteis com feedback detalhado, nota estimada e sugestões específicas de melhoria baseadas nos critérios do ENEM."
  },
  {
    question: "Posso cancelar ou reagendar uma aula?",
    answer: "Sim! Você pode cancelar ou reagendar com até 2 horas de antecedência pelo WhatsApp. Oferecemos total flexibilidade para se adaptar à sua rotina de estudos."
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "Aceitamos PIX (com desconto), cartão de crédito via Mercado Pago e transferência bancária. O pagamento é feito apenas após a confirmação da aula ou serviço."
  },
  {
    question: "O material de estudo está incluso?",
    answer: "Sim! Todo material necessário está incluso: listas de exercícios, resumos teóricos, temas de redação atualizados e simulados. Você não precisa comprar nada adicional."
  },
  {
    question: "Vocês atendem outros vestibulares além do ENEM?",
    answer: "Sim! Atendemos FUVEST, UNICAMP, UNESP e outros vestibulares. Nossa metodologia se adapta às especificidades de cada prova e instituição."
  },
  {
    question: "Existe desconto para pacotes maiores?",
    answer: "Sim! Os pacotes oferecem melhor custo-benefício. Também oferecemos descontos especiais para pagamento à vista no PIX e para estudantes que indicam amigos."
  }
];

export const FAQ = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e metodologia
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-service border-0"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ainda tem dúvidas? Fale conosco!
          </p>
          <button 
            onClick={() => {
              const message = encodeURIComponent("Oi! Tenho algumas dúvidas sobre os serviços. Vim pelo site GS Aprova.");
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
            className="btn-hero inline-flex items-center gap-2"
          >
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};