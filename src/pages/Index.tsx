import { Navigation } from '@/components/Navigation';
import { Section } from '@/components/Section';
import { TestimonialCard } from '@/components/TestimonialCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import QuickSurvey from '@/components/QuickSurvey';
import { ScrollTracker } from '@/components/ScrollTracker';
import Hero from '@/sections/Hero';
import { MateriaisExclusivos } from '@/components/MateriaisExclusivos';
import { NewsletterPopup } from '@/components/NewsletterPopup';
import { SprintBox } from '@/components/SprintBox';
import { NossosDiferenciais } from '@/components/NossosDiferenciais';
import { BlogSection } from '@/components/BlogSection';
import { BannerInicial } from '@/components/BannerInicial';
import { useEffect, useState } from 'react';
import { trackPageSection, trackEvent } from '@/lib/analytics';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, Shield, Flame } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'GS Aprova — Descubra os Temas que Mais Caem no ENEM 2025';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        '35% das questões ENEM são matemática básica! Guia baseado na análise das provas oficiais 2022-2024 + apostas para 2025. Download gratuito.'
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

  // Pricing plans
  const planos = [
    {
      id: 'curso-intensivo',
      titulo: 'Curso Intensivo de Matemática ENEM',
      preco: 'R$ 23,94',
      preco_original: 'R$ 39,90',
      preco_parcelado: 'ou 3x de R$ 7,98',
      bullets: [
        'Foco nos 35% de matemática básica',
        '200+ questões resolvidas passo a passo',
        'Acesso por 60 dias à plataforma',
        'Material baseado em dados oficiais INEP',
        'Simulados focados no que mais cai',
      ],
      cta: 'Quero Garantir',
      badge: 'SUPER PROMOÇÃO',
      destaque: true,
    },
    {
      id: 'aulas-particulares',
      titulo: 'Aulas Particulares',
      preco: 'a partir de R$ 29,94',
      preco_original: 'R$ 49,90',
      preco_parcelado: 'por aula',
      bullets: [
        'Aulas individuais personalizadas',
        'Horários flexíveis',
        'Material complementar',
        'Suporte via WhatsApp',
      ],
      cta: 'Solicitar Orçamento',
      badge: null,
      destaque: false,
    },
    {
      id: 'correcao-redacao',
      titulo: 'Correção de Redação',
      preco: 'R$ 11,94',
      preco_original: 'R$ 19,90',
      preco_parcelado: 'por correção',
      bullets: [
        'Correção pelos critérios do ENEM',
        'Devolutiva detalhada em 48h',
        'Recomendações práticas',
        'Acompanhamento da evolução',
      ],
      cta: 'Enviar Redação',
      badge: null,
      destaque: false,
      isEssayCorrection: true,
    },
    {
      id: 'trilha-personalizada',
      titulo: 'Trilha Personalizada',
      preco: 'a partir de R$ 41,94',
      preco_original: 'R$ 69,90',
      preco_parcelado: 'por mês',
      bullets: [
        'Diagnóstico completo',
        'Cronograma adaptado',
        'Acompanhamento semanal',
        'Ajustes contínuos',
      ],
      cta: 'Quero Minha Trilha',
      badge: null,
      destaque: false,
    },
    {
      id: 'mentoria-individual',
      titulo: 'Mentoria Individual',
      preco: 'a partir de R$ 53,94',
      preco_original: 'R$ 89,90',
      preco_parcelado: 'por sessão',
      bullets: [
        'Aula + Plantão de Dúvidas',
        'Acompanhamento de estudos',
        'Orientação estratégica',
        'Planejamento até a prova',
      ],
      cta: 'Agendar Mentoria',
      badge: null,
      destaque: false,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showEssayOptions, setShowEssayOptions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePlanClick = (planoId: string) => {
    trackEvent('plan_interest', { plan_id: planoId, page: 'home' });
    setSelectedPlan(planoId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('service_leads').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim(),
        service_type: selectedPlan!,
        message: formData.message.trim() || null,
      });

      if (error) throw error;

      trackEvent('service_lead_submit', {
        service_type: selectedPlan,
        source: 'home_page',
      });

      // Se for correção de redação, mostrar opções de login
      const plan = planos.find(p => p.id === selectedPlan);
      if (plan?.isEssayCorrection) {
        setShowEssayOptions(true);
      } else {
        toast({
          title: 'Solicitação enviada!',
          description: 'Entraremos em contato via WhatsApp em breve.',
        });
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanTitle = (planId: string) => {
    const plan = planos.find(p => p.id === planId);
    return plan?.titulo || planId;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Black November Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 py-2 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-white">
          <span className="text-xl">🔥</span>
          <span>BLACK NOVEMBER: 40% OFF em todos os planos!</span>
          <span className="text-xl">🔥</span>
        </div>
      </div>
      
      <Navigation />
      <ScrollTracker />
      <NewsletterPopup />

      <main>
        {/* Banner Inicial */}
        <BannerInicial />

        {/* Sprint Redação 900+ Box */}
        <Section variant="light" className="py-12">
          <div className="mx-auto max-w-2xl">
            <SprintBox />
          </div>
        </Section>

        {/* Hero Section - Guia dos Temas */}
        <Hero />

        {/* Matemática no ENEM 2025 */}
        <MateriaisExclusivos />

        {/* 3. Nossos Diferenciais */}
        <NossosDiferenciais />

        {/* 5. Blog GS Aprova */}
        <BlogSection />

        {/* 6. Pricing Section */}
        <Section variant="light" id="planos" data-testid="section-pricing">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
              Escolha seu plano
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Soluções personalizadas baseadas em análise de dados oficiais INEP para sua aprovação
              no ENEM 2025
            </p>
          </div>

          {/* Plano Destaque */}
          <div className="mx-auto mb-12 max-w-4xl">
            {planos
              .filter(p => p.destaque)
              .map(plano => (
                <Card
                  key={plano.id}
                  className="relative rounded-2xl border-4 border-[#FBBF24] bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                >
                  <Badge className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center space-x-2 bg-[#DC2626] px-6 py-2 text-lg text-white">
                    <Flame className="size-5" />
                    <span>{plano.badge}</span>
                  </Badge>

                  <CardHeader className="pb-4 pt-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-[#1E3A8A]">{plano.titulo}</h2>
                    <div className="mb-2 text-5xl font-bold text-[#1E3A8A]">{plano.preco}</div>
                    {plano.preco_original && (
                      <div className="text-lg text-[#1E3A8A]/60 line-through">
                        {plano.preco_original}
                      </div>
                    )}
                    <div className="text-lg text-[#1E3A8A]/80">{plano.preco_parcelado}</div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plano.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="mt-0.5 size-6 shrink-0 text-[#1E3A8A]" />
                          <span className="text-base font-medium text-[#1E3A8A]">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanClick(plano.id)}
                      className="mt-6 w-full bg-[#1E3A8A] py-7 text-xl font-bold text-white hover:bg-[#1E3A8A]/90"
                      size="lg"
                    >
                      {plano.cta}
                    </Button>

                    <div className="flex items-center justify-center space-x-2 pt-2 text-sm text-[#1E3A8A]/80">
                      <Shield className="size-5" />
                      <span className="font-semibold">
                        Garantia 7 dias — cancelamento com devolução integral
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Outros Planos - Grid 2x2 */}
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {planos
              .filter(p => !p.destaque)
              .map(plano => (
                <Card
                  key={plano.id}
                  className="relative rounded-xl border-2 border-[#E5E7EB] bg-white shadow-lg transition-all duration-300 hover:border-[#FBBF24] hover:shadow-xl dark:border-[#FBBF24]/20 dark:bg-[#1E3A8A]"
                >
                  <CardHeader className="pb-4 text-center">
                    <h2 className="mb-2 text-xl font-bold text-[#1E3A8A] dark:text-white">
                      {plano.titulo}
                    </h2>
                    <div className="text-3xl font-bold text-[#1E3A8A] dark:text-[#FBBF24]">
                      {plano.preco}
                    </div>
                    {plano.preco_original && (
                      <div className="text-sm text-gray-500 line-through dark:text-white/50">
                        {plano.preco_original}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 dark:text-white/70">
                      {plano.preco_parcelado}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="min-h-[120px] space-y-3">
                      {plano.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="mt-0.5 size-5 shrink-0 text-[#FBBF24]" />
                          <span className="text-sm text-[#111827] dark:text-white">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanClick(plano.id)}
                      className="mt-6 w-full bg-[#FBBF24] font-semibold text-[#1E3A8A] hover:brightness-95"
                      size="lg"
                    >
                      {plano.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </Section>

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

      {/* Modal de Formulário */}
      <Dialog
        open={selectedPlan !== null}
        onOpenChange={() => {
          setSelectedPlan(null);
          setShowEssayOptions(false);
          setFormData({ name: '', email: '', whatsapp: '', message: '' });
        }}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1E3A8A]">
              {selectedPlan && getPlanTitle(selectedPlan)}
            </DialogTitle>
          </DialogHeader>

          {showEssayOptions ? (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="mb-4 text-center font-semibold text-green-800">
                  ✅ Solicitação recebida com sucesso!
                </p>
                <p className="mb-4 text-center text-gray-700">Para enviar sua redação:</p>
              </div>

              <Button
                onClick={() => (window.location.href = '/auth-aluno')}
                className="w-full bg-[#1E3A8A] py-6 font-semibold text-white hover:bg-[#1E3A8A]/90"
                size="lg"
              >
                Já sou aluno? Fazer Login
              </Button>

              <Button
                onClick={() => (window.location.href = '/auth-aluno?tab=signup')}
                variant="outline"
                className="w-full border-[#1E3A8A] py-6 font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                size="lg"
              >
                Novo aluno? Cadastrar Agora
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name" className="text-[#1E3A8A]">
                  Nome completo *
                </Label>
                <Input
                  id="plan-name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-email" className="text-[#1E3A8A]">
                  E-mail *
                </Label>
                <Input
                  id="plan-email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-whatsapp" className="text-[#1E3A8A]">
                  WhatsApp *
                </Label>
                <Input
                  id="plan-whatsapp"
                  value={formData.whatsapp}
                  onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-message" className="text-[#1E3A8A]">
                  Mensagem (opcional)
                </Label>
                <Textarea
                  id="plan-message"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Conte-nos sobre suas necessidades..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1E3A8A] py-6 font-semibold text-white hover:bg-[#1E3A8A]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <StickyWhatsApp />
      <QuickSurvey />
    </div>
  );
};

export default Index;
