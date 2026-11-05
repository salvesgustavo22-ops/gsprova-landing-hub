// Business contact constants
export const BUSINESS_PHONE = '5511985363890';
export const BUSINESS_WHATSAPP_URL = `https://wa.me/${BUSINESS_PHONE}`;
export const BUSINESS_PHONE_DISPLAY = '(11) 98536-3890';
export const WHATSAPP_ATENDIMENTO_URL = `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent('Olá! Vim pelo site GS Aprova e gostaria de atendimento.')}`;
export const PLANTAO_WHATSAPP_URL = `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre o Plantão de Véspera ENEM 2026.')}`;
export const PLANTAO_CHECKOUT_URL = "https://go.hotmart.com/B108352098P";

// Default WhatsApp messages
export const WHATSAPP_MESSAGES = {
  general: 'Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.',
  hero: 'Oi, quero começar agora meus estudos. Vim pelo site GS Aprova.',
  services: 'Oi, quero me inscrever no GS Aprova. Vim pelo site.',
  faq: 'Oi! Tenho algumas dúvidas sobre os serviços. Vim pelo site GS Aprova.',
  finalCta: 'Oi, não quero perder tempo! Quero começar hoje mesmo. Vim pelo site GS Aprova.',
  trustSecurity: 'Oi, quero agendar uma aula-pocket gratuita! Vim pelo site GS Aprova.',
  contact:
    'Oi, acabei de enviar uma solicitação pelo formulário do site. Gostaria de falar sobre minha necessidade.',
  checklistThankYou:
    'Oi! Acabei de baixar o checklist ENEM 2026 e quero saber mais sobre os serviços do GS Aprova.',
  heroEnem: 'Oi, quero começar agora meus estudos para ENEM/Fuvest 2026. Vim pelo site GS Aprova.',
} as const;
