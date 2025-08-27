// Enhanced Analytics utility functions for Google Analytics 4

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize GA4
export const initializeGA4 = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', measurementId);
  }
};

// Generic event tracking
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }
};

// Enhanced conversion tracking
export const trackConversion = (action: string, value?: number, currency: string = 'BRL') => {
  trackEvent('conversion', {
    event_category: 'conversion',
    action,
    value,
    currency
  });
};

// Lead generation tracking
export const trackLeadGeneration = (source: string, method: string = 'form') => {
  trackEvent('generate_lead', {
    event_category: 'lead_generation',
    lead_source: source,
    lead_method: method
  });
};

// CTA and engagement tracking
export const trackWhatsAppClick = (source: string, service?: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    click_source: source,
    service_interest: service,
    platform: 'whatsapp'
  });
};

export const trackPlanClick = (planName: string, price: string, category: string) => {
  trackEvent('select_item', {
    event_category: 'ecommerce',
    item_name: planName,
    item_category: category,
    price: parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')),
    currency: 'BRL'
  });
};

// Page interaction tracking
export const trackPageSection = (sectionName: string, action: string = 'view') => {
  trackEvent('page_section_interaction', {
    event_category: 'engagement',
    section_name: sectionName,
    action
  });
};

// Form tracking
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    event_category: 'form_interaction',
    form_name: formName
  });
};

export const trackFormSubmit = (formName: string, serviceType?: string) => {
  trackEvent('form_submit', {
    event_category: 'form_interaction',
    form_name: formName,
    service_type: serviceType
  });
};

// Service selection tracking
export const trackServiceSelection = (serviceName: string, serviceType: string) => {
  trackEvent('service_selection', {
    event_category: 'product_interaction',
    service_name: serviceName,
    service_type: serviceType
  });
};

// User behavior tracking
export const trackScroll = (percentage: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    scroll_percentage: percentage
  });
};

export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    time_seconds: timeInSeconds
  });
};

// Custom events for specific actions
export const trackFAQInteraction = (question: string, action: 'open' | 'close') => {
  trackEvent('faq_interaction', {
    event_category: 'content_interaction',
    question: question.substring(0, 50), // Limit length
    action
  });
};

export const trackSecurityIndicatorView = () => {
  trackEvent('security_indicator_view', {
    event_category: 'trust_signals',
    indicator_type: 'security_badges'
  });
};

export const trackGuaranteeView = () => {
  trackEvent('guarantee_view', {
    event_category: 'trust_signals',
    guarantee_type: '7_day_money_back'
  });
};