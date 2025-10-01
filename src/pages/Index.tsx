import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import QuickSurvey from "@/components/QuickSurvey";
import { ScrollTracker } from "@/components/ScrollTracker";
import { useEffect } from "react";
import { trackEvent, trackPageSection, trackClick } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL } from "@/lib/constants";
import { experiments } from "@/config/experiments";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Users, 
  BookOpen, 
  MessageCircle,
  Award,
  TrendingUp,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-student-18yo.jpg";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "GS Aprova — ENEM sem enrolação: revisão diária + correção de redação + mentoria";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Intensivo até 09/11/2025. Foco no que mais cai. Suporte no WhatsApp. Correção de redação com devolutiva e mentoria individual.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "name": "GS Aprova",
      "description": "Curso Intensivo ENEM, Correção de Redação e Mentoria Individual",
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
          "name": "Curso Intensivo ENEM",
          "price": "199.90",
          "priceCurrency": "BRL"
        },
        {
          "@type": "Offer", 
          "name": "Correção de Redação",
          "price": "29.90",
          "priceCurrency": "BRL"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Track page view
    trackPageSection('home', 'view');

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Hero CTA handlers
  const handlePrimaryCTA = () => {
    trackClick('cta_hero_matricular');
    const planosSection = document.getElementById('planos');
    if (planosSection) {
      planosSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/planos#curso-intensivo';
    }
  };

  const handleSecondaryCTA = () => {
    trackClick('cta_hero_correcao');
    const planosSection = document.getElementById('planos');
    if (planosSection) {
      planosSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/planos#correcao';
    }
  };

  // Benefits data
  const benefits = [
    {
      icon: Target,
      title: "Trilha focada",
      description: "Conteúdo direcionado para o que mais cai no ENEM"
    },
    {
      icon: BookOpen,
      title: "Correção com devolutiva",
      description: "Análise detalhada com sugestões de melhoria"
    },
    {
      icon: Clock,
      title: "Simulados táticos",
      description: "Treinamento com tempo cronometrado"
    },
    {
      icon: MessageCircle,
      title: "Mentoria on-demand",
      description: "Suporte direto no WhatsApp quando precisar"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Ana Carolina",
      text: "Subiu minha nota em matemática de 650 para 780 pontos. O método realmente funciona!",
      score: "+120 pontos em mat",
      photo: "/placeholder-student-1.jpg"
    },
    {
      name: "Pedro Silva",
      text: "A correção de redação foi fundamental. Passei de 600 para 920 na redação!",
      score: "+320 pontos redação",
      photo: "/placeholder-student-2.jpg"
    },
    {
      name: "Mariana Santos",
      text: "Mentoria individualizada fez toda diferença. Consegui minha vaga na USP!",
      score: "Aprovada USP",
      photo: "/placeholder-student-3.jpg"
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      title: "Correção",
      price: "R$ 29,90",
      features: [
        "2 correções de redação",
        "Devolutiva detalhada em 48h",
        "Sugestões personalizadas",
        "Acesso por 30 dias"
      ],
      ctaLabel: "Começar correção",
      ctaHref: "/contato",
      highlight: false
    },
    {
      title: "Combo Intensivo",
      price: "R$ 199,90",
      features: [
        "Revisão diária até 09/11",
        "4 correções de redação",
        "Mentoria no WhatsApp",
        "Simulados semanais",
        "Material completo",
        "Garantia 7 dias"
      ],
      ctaLabel: "Matricular agora",
      ctaHref: "/contato",
      highlight: true,
      badge: "Mais popular"
    },
    {
      title: "Matemática",
      price: "R$ 99,90",
      features: [
        "Foco em matemática",
        "Exercícios direcionados",
        "Aulas práticas",
        "Suporte no WhatsApp",
        "30 dias de acesso"
      ],
      ctaLabel: "Quero matemática",
      ctaHref: "/contato",
      highlight: false
    }
  ];

  const heroVariant = experiments.HERO_VARIANT;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollTracker />
      
      <main>
        {/* 1. Hero Section */}
        <section 
          data-testid="hero-main"
          className={
            heroVariant === 'dark' 
              ? "min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] text-white relative overflow-hidden"
              : "min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white relative overflow-hidden"
          }
        >
          <div className="container mx-auto px-4 md:px-6 pt-20 pb-16">
            <div className="flex flex-col items-center text-center space-y-8 relative z-10">
              <Badge className="bg-[#FBBF24] text-[#1E3A8A] px-4 py-2 text-sm font-semibold">
                Vagas limitadas
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl font-['Montserrat']">
                ENEM sem enrolação: revisão diária + correção de redação + mentoria
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                Intensivo até 09/11/2025. Foco no que mais cai. Suporte no WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={handlePrimaryCTA}
                  className="bg-[#FBBF24] text-[#1E3A8A] hover:brightness-95 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                  data-analytics="cta_hero_matricular"
                >
                  Matricular — R$ 199,90
                </Button>
                
                <Button
                  onClick={handleSecondaryCTA}
                  className="bg-white text-[#1E3A8A] border border-[#FBBF24] hover:bg-[#FBBF24] hover:text-[#1E3A8A] font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300"
                  data-analytics="cta_hero_correcao"
                >
                  2 correções — R$ 29,90
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Benefits Section */}
        <Section variant="neutral" data-testid="section-benefits">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Como te ajudamos a conquistar sua vaga
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Metodologia comprovada com foco no que realmente importa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-all duration-300">
                  <Icon className="h-8 w-8 text-[#3B82F6] mb-4" />
                  <h3 className="font-semibold text-lg text-[#1E3A8A] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => window.location.href = '/sobre'}
              className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-8 py-3 rounded-lg font-semibold"
            >
              Ver como funciona
            </Button>
          </div>
        </Section>

        {/* 3. Testimonials Section */}
        <Section variant="light" className="bg-[#E0F2FE] dark:bg-[#1E3A8A]" data-testid="section-testimonials">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-white mb-4">
              Resultados dos nossos alunos
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/80 max-w-2xl mx-auto">
              Veja como nossos estudantes conquistaram suas vagas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                data-testid={`testimonial-${index + 1}`}
              />
            ))}
          </div>
        </Section>

        {/* 4. Pricing Section */}
        <Section variant="light" id="planos" data-testid="section-pricing">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Escolha seu plano
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Opções flexíveis para seu perfil e necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                data-testid={`pricing-card-${index + 1}`}
              />
            ))}
          </div>
        </Section>

        {/* 5. Contact Section */}
        <Section variant="neutral" className="bg-[#F3F4F6] dark:bg-[#0F172A]" data-testid="section-contact">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/80">
                Entre em contato e tire suas dúvidas
              </p>
            </div>
            
            <ContactForm 
              origem="contato-home"
              data-testid="form-contact"
            />
          </div>
        </Section>

        <FAQ />
      </main>
      
      <Footer />
      <StickyWhatsApp />
      <QuickSurvey />
    </div>
  );
};

export default Index;
