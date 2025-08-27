import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { TrustAndSecurity } from "@/components/TrustAndSecurity";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ScrollTracker } from "@/components/ScrollTracker";
import { useEffect } from "react";
import { initializeGA4 } from "@/lib/analytics";
import { deferExecution } from "@/utils/performance";
import heroImage from "@/assets/hero-student-18yo.jpg";

const Index = () => {
  useEffect(() => {
    // Defer non-critical initializations
    deferExecution(() => {
      // Initialize Google Analytics 4
      initializeGA4('G-XXXXXXXXXX');
    }, 100);
    
    // Add resource hints to improve loading performance
    const addResourceHint = (rel: string, href: string, as?: string) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      document.head.appendChild(link);
      return link;
    };

    // Preconnect to external domains to reduce DNS lookup time
    addResourceHint('dns-prefetch', 'https://www.googletagmanager.com');
    addResourceHint('preconnect', 'https://www.googletagmanager.com', undefined);
    
    // Preload hero image for LCP optimization
    const heroImageLink = document.createElement('link');
    heroImageLink.rel = 'preload';
    heroImageLink.as = 'image';
    heroImageLink.href = heroImage;
    heroImageLink.fetchPriority = 'high';
    document.head.appendChild(heroImageLink);
    
    // Remove duplicate critical CSS (already inlined in HTML)
    // Critical styles are now in index.html for better performance
    
    // Update page title and meta description for SEO
    document.title = "GS Aprova | Aulas de Matemática e Correção de Redação para ENEM e Fuvest";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Aulas práticas de Matemática e correções detalhadas de Redação para ENEM e Fuvest. Estude online ou presencial e aumente sua nota. Fale agora pelo WhatsApp.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "name": "GS Aprova",
      "description": "Aulas particulares de Matemática e correção de Redação para ENEM e vestibulares",
      "address": {
        "@type": "PostalAddress", 
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "telephone": "+55-11-99999-9999",
      "url": window.location.origin,
      "sameAs": [],
      "offers": [
        {
          "@type": "Offer",
          "name": "Aula de Matemática",
          "price": "70",
          "priceCurrency": "BRL"
        },
        {
          "@type": "Offer", 
          "name": "Correção de Redação",
          "price": "70",
          "priceCurrency": "BRL"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollTracker />
      <main>
        <Hero />
        <Benefits />
        <SocialProof />
        <Services />
        <TrustAndSecurity />
        <HowItWorks />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Index;
