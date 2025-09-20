import { Navigation } from "@/components/Navigation";
import Hero from "@/sections/Hero";
import { ThematicSections } from "@/components/ThematicSections";
import { Benefits } from "@/components/Benefits";
import { SocialProof } from "@/components/SocialProof";
import { Services } from "@/components/Services";
import { TrustAndSecurity } from "@/components/TrustAndSecurity";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ScrollTracker } from "@/components/ScrollTracker";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { deferExecution } from "@/utils/performance";
import heroImage from "@/assets/hero-student-18yo.jpg";

const Index = () => {
  useEffect(() => {
    Defer non-critical initializations
    deferExecution(() => {
      Initialize Google Analytics 4
      initializeGA4('G-KCQG5DDZGG'); // Commented out for now
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
    document.title = "ENEM 2025 e Fuvest 2025: Aulas de Matemática Online e Correção de Redação | GS Aprova";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Prepare-se para o ENEM 2025 e Fuvest 2025 com aulas de matemática online, correção de redação personalizada e trilha de estudos. Simulados, dicas práticas e suporte direto no WhatsApp.');
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
      <Navigation />
      <ScrollTracker />
      <main>
        <Hero />
        
        {/* Matemática Section */}
        <section id="matematica" className="scroll-mt-20">
          <Services />
        </section>
        
        <Benefits />
        <HowItWorks />
        <TrustSection />
        <SocialProof />
        
        {/* Redação Section */}
        <section id="redacao" className="scroll-mt-20">
          <ThematicSections />
        </section>
        
        {/* Simulados Section */}
        <section id="simulados" className="scroll-mt-20">
          <div className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Simulados ENEM</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pratique com simulados que reproduzem fielmente o formato do ENEM
              </p>
              <Button 
                onClick={() => {
                  trackEvent('cta_click', { label: 'Simulados - Quero fazer' });
                  const message = encodeURIComponent("Quero saber mais sobre os simulados ENEM");
                  window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Quero fazer simulados
              </Button>
            </div>
          </div>
        </section>
        
        {/* Planos e Preços Section */}
        <section id="pricing" className="scroll-mt-20">
          <FinalCTA />
        </section>
        
        <FAQ />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Index;
