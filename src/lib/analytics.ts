// Analytics tracking functions for GS Aprova

// Initialize Google Analytics 4
export const initializeGA4 = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', measurementId);

  // Make gtag globally available
  (window as any).gtag = gtag;
};

// Generic event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, {
    event_category: 'engagement',
    ...parameters,
  });
};

// Specific tracking functions
export const trackClick = (id: string, additionalData?: Record<string, any>) => {
  trackEvent('click', {
    element_id: id,
    ...additionalData,
  });
};

export const trackPageSection = (sectionName: string, action: string = 'view') => {
  trackEvent('page_section', {
    section_name: sectionName,
    action,
  });
};

export const trackConversion = (action: string, value?: number, currency: string = 'BRL') => {
  trackEvent('conversion', {
    action,
    value,
    currency,
  });
};

export const trackLeadGeneration = (source: string, method?: string) => {
  trackEvent('generate_lead', {
    source,
    method,
  });
};

export const trackWhatsAppClick = (source: string, service?: string) => {
  trackEvent('whatsapp_click', {
    source,
    service,
  });
};

export const trackPlanClick = (planName: string, price: string, category: string = 'pricing') => {
  trackEvent('select_item', {
    item_name: planName,
    item_category: category,
    value: parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
    currency: 'BRL',
  });
};

export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    form_name: formName,
  });
};

export const trackFormSubmit = (formName: string, serviceType?: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    service_type: serviceType,
  });
};

export const trackServiceSelection = (serviceName: string, serviceType: string) => {
  trackEvent('select_content', {
    content_type: 'service',
    item_id: serviceName,
    service_type: serviceType,
  });
};

export const trackScroll = (percentage: number) => {
  trackEvent('scroll', {
    percent_scrolled: percentage,
  });
};

export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent('timing_complete', {
    name: 'page_view_time',
    value: timeInSeconds,
  });
};

export const trackFAQInteraction = (question: string, action: 'open' | 'close') => {
  trackEvent('faq_interaction', {
    question: question.substring(0, 100), // Limit length
    action,
  });
};

// Declare global dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
