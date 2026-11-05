import { Navigation } from '@/components/Navigation';
import { Section } from '@/components/Section';
import { TestimonialCard } from '@/components/TestimonialCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';

import { ScrollTracker } from '@/components/ScrollTracker';
import Hero from '@/sections/Hero';
import { MateriaisExclusivos } from '@/components/MateriaisExclusivos';
import { PlantaoHeroBox } from '@/components/PlantaoHeroBox';
import { NossosDiferenciais } from '@/components/NossosDiferenciais';
import { BlogSection } from '@/components/BlogSection';
import { BannerInicial } from '@/components/BannerInicial';
import { useEffect } from 'react';
import { trackPageSection } from '@/lib/analytics';

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Correção de Redação ENEM 2026 – GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Envie sua redação e receba correção em até 48h: aumente sua nota no ENEM com a GS Aprova!'
      );
    }

    // Add structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'EducationalOrganization'],
      name: 'GS Aprova',
      description: 'Curso Intensivo ENEM, Correção de Redação e Mentoria Individual',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
      telephone: '+55-11-99999-9999',
      url: window.location.origin,
      sameAs: [],
      offers: [
        {
          '@type': 'Offer',
          name: 'Curso Intensivo ENEM',
          price: '199.90',
          priceCurrency: 'BRL',
        },
        {
          '@type': 'Offer',
          name: 'Correção de Redação',
          price: '29.90',
          priceCurrency: 'BRL',
        },
      ],
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

  // Testimonials data - Updated to focus on quality and confidence
  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'As aulas de matemática são muito didáticas. Finalmente entendi funções!',
      score: 'Aprovada FUVEST 2024',
      photo: '/placeholder-student-1.jpg',
    },
    {
      name: 'João Santos',
      text: 'A trilha personalizada me deu confiança. Sabia exatamente o que estudar.',
      score: 'Aprovado USP 2024',
      photo: '/placeholder-student-2.jpg',
    },
    {
      name: 'Ana Costa',
      text: 'O material baseado nas provas oficiais fez toda diferença.',
      score: 'Nota 950 em matemática',
      photo: '/placeholder-student-3.jpg',
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      
      <Navigation />
      <ScrollTracker />

      <main>
        {/* Banner Inicial */}
        <BannerInicial />

        {/* Plantão ENEM 2026 */}
        <section className="bg-plantao-bg px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <PlantaoHeroBox headingLevel="h2" />
          </div>
        </section>

        {/* Hero Section - Guia dos Temas */}
        <Hero />

        {/* Matemática no ENEM 2026 */}
        <MateriaisExclusivos />

        {/* 3. Nossos Diferenciais */}
        <NossosDiferenciais />

        {/* 5. Blog GS Aprova */}
        <BlogSection />

        {/* 7. Contact Section */}
        <Section
          variant="neutral"
          className="bg-[#F3F4F6] dark:bg-[#0F172A]"
          data-testid="section-contact"
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1E3A8A] dark:text-white md:text-4xl">
                Pronto para começar?
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/80">
                Entre em contato e tire suas dúvidas
              </p>
            </div>

            <ContactForm origem="contato-home" data-testid="form-contact" />
          </div>
        </Section>

        <FAQ />
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Index;
