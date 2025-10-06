import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import QuickSurvey from "@/components/QuickSurvey";
import { ScrollTracker } from "@/components/ScrollTracker";
import Hero from "@/sections/Hero";
import { MateriaisExclusivos } from "@/components/MateriaisExclusivos";
import { EmailPopup } from "@/components/EmailPopup";
import { NossosDiferenciais } from "@/components/NossosDiferenciais";
import { useEffect } from "react";
import { trackPageSection, trackClick } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL } from "@/lib/constants";
import { 
  Target, 
  BookOpen, 
  Clock, 
  MessageCircle
} from "lucide-react";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "GS Aprova — Descubra os Temas que Mais Caem no ENEM 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '35% das questões ENEM são matemática básica! Guia baseado na análise das provas oficiais 2022-2024 + apostas para 2025. Download gratuito.');
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

  // Testimonials data - Updated to focus on quality and confidence
  const testimonials = [
    {
      name: "Maria Silva",
      text: "As aulas de matemática são muito didáticas. Finalmente entendi funções!",
      score: "Aprovada FUVEST 2024",
      photo: "/placeholder-student-1.jpg"
    },
    {
      name: "João Santos",
      text: "A trilha personalizada me deu confiança. Sabia exatamente o que estudar.",
      score: "Aprovado USP 2024",
      photo: "/placeholder-student-2.jpg"
    },
    {
      name: "Ana Costa",
      text: "O material baseado nas provas oficiais fez toda diferença.",
      score: "Nota 950 em matemática",
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollTracker />
      <EmailPopup />
      
      <main>
        {/* 1. Hero Section */}
        <Hero />
        
        {/* 2. Materiais Exclusivos */}
        <MateriaisExclusivos />

        {/* 3. Nossos Diferenciais */}
        <NossosDiferenciais />

        {/* 4. Benefits Section */}
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

        {/* 5. Testimonials Section */}
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

        {/* 6. Pricing Section */}
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

        {/* 7. Contact Section */}
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
