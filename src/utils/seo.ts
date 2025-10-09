/**
 * SEO utilities for dynamic meta tag management
 */

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  author?: string;
  structuredData?: Record<string, any>;
}

/**
 * Updates document meta tags dynamically
 */
export const updateSEOTags = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  keywords = [],
  author = 'GS Aprova',
  structuredData,
}: SEOConfig) => {
  if (typeof document === 'undefined') return;

  // Update title
  document.title = title;

  // Helper function to update or create meta tag
  const updateMetaTag = (selector: string, content: string) => {
    let tag = document.querySelector(selector) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      if (selector.includes('property=')) {
        tag.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
      } else {
        tag.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
      }
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  // Update meta description
  updateMetaTag('meta[name="description"]', description);

  // Update keywords if provided
  if (keywords.length > 0) {
    updateMetaTag('meta[name="keywords"]', keywords.join(', '));
  }

  // Update author
  updateMetaTag('meta[name="author"]', author);

  // Update Open Graph tags
  updateMetaTag('meta[property="og:title"]', title);
  updateMetaTag('meta[property="og:description"]', description);
  updateMetaTag('meta[property="og:type"]', ogType);

  if (ogImage) {
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
  }

  // Update Twitter Card
  updateMetaTag('meta[name="twitter:title"]', title);
  updateMetaTag('meta[name="twitter:description"]', description);

  // Update canonical link
  if (canonical) {
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonical;
    updateMetaTag('meta[property="og:url"]', canonical);
  }

  // Add structured data
  if (structuredData) {
    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }
};

/**
 * Generate structured data for educational services
 */
export const generateEducationalServiceStructuredData = (
  name: string,
  description: string,
  provider: string = 'GS Aprova',
  url?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: provider,
    url: url || 'https://gsmatematicanegocios.com.br',
    description: description,
    offers: {
      '@type': 'Offer',
      name: name,
      description: description,
      provider: {
        '@type': 'Organization',
        name: provider,
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-97496-9036',
      contactType: 'Customer Service',
      availableLanguage: 'Portuguese',
    },
  };
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate FAQ structured data
 */
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Preconnect to external domains for performance
 */
export const preconnectToDomains = (domains: string[]) => {
  if (typeof document === 'undefined') return;

  domains.forEach(domain => {
    // DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);

    // Preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  });
};
