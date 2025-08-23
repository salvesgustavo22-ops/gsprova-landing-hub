// Analytics utility functions with proper TypeScript support

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackWhatsAppClick = (label: string, variant?: string) => {
  trackEvent('cta_whatsapp_click', {
    event_category: 'engagement',
    event_label: label,
    page_variant: variant || 'default'
  });
};

export const trackPlanClick = (planName: string, variant?: string) => {
  trackEvent('plan_card_click', {
    event_category: 'engagement',
    plan_name: planName,
    page_variant: variant || 'default'
  });
};

export const trackLeadSubmit = (variant?: string) => {
  trackEvent('lead_submit', {
    event_category: 'conversion',
    page_variant: variant || 'default'
  });
};