import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
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
      <main>
        <Hero />
        <Benefits />
        <SocialProof />
        <Services />
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
