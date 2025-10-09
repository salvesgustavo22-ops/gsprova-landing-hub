import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Shield, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';

const Leads = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    interesse: '',
    lgpdAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Google tag (gtag.js)
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-KCQG5DDZGG';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KCQG5DDZGG');
    `;
    document.head.appendChild(script2);

    // Update page title and meta description
    document.title = 'Contato - GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Fale com o GS Aprova. Atendimento rápido para Curso Intensivo ENEM, Correção de Redação e Material Completo.'
      );
    }

    // Cleanup scripts on unmount (optional but recommended)
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `(${digits.slice(2)})`;
    } else if (digits.length <= 9) {
      return `(${digits.slice(2, 4)}) ${digits.slice(4)}`;
    } else {
      return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.nome.length < 2) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (formData.email.length < 5 || !formData.email.includes('@')) {
      setError('Email inválido');
      return;
    }

    if (formData.telefone.length < 10) {
      setError('WhatsApp inválido');
      return;
    }

    if (!formData.interesse) {
      setError('Selecione seu interesse');
      return;
    }

    if (!formData.lgpdAccepted) {
      setError('Você precisa autorizar o contato');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direto';
      const utmMedium = urlParams.get('utm_medium') || 'site';
      const utmCampaign = urlParams.get('utm_campaign') || 'leads_page';

      // Insert into Supabase
      const { error: insertError } = await supabase.from('leads').insert({
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        lead_type: 'contratacao',
        service_selected: formData.interesse,
        message: `Lead capturado via leads_page - Interesse: ${formData.interesse}`,
        source: `leads_page|utm_source:${utmSource}|utm_medium:${utmMedium}|utm_campaign:${utmCampaign}`,
      });

      if (insertError) {
        console.error('Erro ao inserir lead:', insertError);
        setError('Erro ao enviar dados. Tente novamente.');
        return;
      }

      // Track analytics
      trackEvent('lead_submit', {
        source: 'leads_page',
        interesse: formData.interesse,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Erro no envio:', err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { label: 'leads_success' });
    const message = encodeURIComponent(
      'Oi! Acabei de preencher o formulário no site. Quero mais informações sobre os cursos.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleVerPlanos = () => {
    window.location.href = '/planos';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-20">
          <section className="py-16">
            <div className="container mx-auto max-w-2xl px-4">
              <Card className="rounded-xl border border-border/50 bg-card shadow-lg">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="mx-auto mb-6 size-16 text-success" />
                  <h1 className="mb-4 text-3xl font-bold text-foreground">Cadastro recebido!</h1>
                  <div className="mb-8 space-y-4">
                    <p className="text-lg text-foreground">
                      Obrigado! Seu curso começará em <strong>03/10/2025</strong>.
                    </p>
                    <p className="text-muted-foreground">
                      Fique de olho no seu e-mail e WhatsApp para orientações de acesso.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleVerPlanos}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      Ver planos e benefícios
                    </Button>
                    <Button
                      onClick={handleWhatsAppClick}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Falar no WhatsApp
                    </Button>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="size-4" />
                    <span>Garantia 7 dias — cancelamento com devolução integral</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
        <StickyWhatsApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-hover py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Fale com o GS Aprova — Atendimento rápido
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90">
              Escolha seu produto e receba atendimento imediato.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto max-w-2xl px-4">
            <Card className="rounded-xl border border-border/50 bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Entre em contato</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium">
                      Nome completo *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Seu nome"
                      required
                      minLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-sm font-medium">
                      WhatsApp *
                    </Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interesse" className="text-sm font-medium">
                      Interesse *
                    </Label>
                    <Select
                      onValueChange={value => setFormData(prev => ({ ...prev, interesse: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu interesse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="correcao">Correção 2 redações</SelectItem>
                        <SelectItem value="curso-intensivo">Curso Intensivo</SelectItem>
                        <SelectItem value="material">Material Completo</SelectItem>
                        <SelectItem value="aulas-particulares">Aulas Particulares</SelectItem>
                        <SelectItem value="plano-customizado">Plano Customizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="lgpd"
                      checked={formData.lgpdAccepted}
                      onCheckedChange={checked =>
                        setFormData(prev => ({ ...prev, lgpdAccepted: !!checked }))
                      }
                      required
                    />
                    <Label htmlFor="lgpd" className="text-sm leading-relaxed text-muted-foreground">
                      Autorizo contato do GS Aprova. *
                    </Label>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar contato'}
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="size-4" />
                    <span>Garantia 7 dias — cancelamento com devolução integral</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Leads;
