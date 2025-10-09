import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Download, Star, Clock } from 'lucide-react';
import { trackFormStart, trackFormSubmit } from '@/lib/analytics';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function LeadChecklist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Baixar Checklist ENEM 2025 Gratuito | GS Aprova';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Baixe gratuitamente nosso checklist completo para o ENEM 2025 com cronograma, tópicos essenciais e estratégias de redação.'
      );
    }

    trackFormStart('checklist_enem_2025');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.whatsapp) {
        toast({
          title: 'Campos obrigatórios',
          description: 'Por favor, preencha todos os campos.',
          variant: 'destructive',
        });
        return;
      }

      // Save to Supabase
      const { error } = await supabase.from('leads').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.whatsapp.trim(),
        lead_type: 'checklist',
        service_selected: 'checklist_enem_2025',
        message: 'Solicitação de download do checklist ENEM 2025',
        source: 'checklist_page',
      });

      if (error) {
        throw error;
      }

      trackFormSubmit('checklist_enem_2025', 'checklist_download');

      // Redirect to thank you page
      window.location.href = '/obrigado-checklist';
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Erro no envio',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Cronograma completo de estudos para o ENEM 2025',
    'Lista dos tópicos de matemática que mais caem',
    'Estrutura detalhada da redação nota 1000',
    'Dicas de interpretação de texto',
    'Estratégias para cada área do conhecimento',
    'Template de planejamento semanal',
  ];

  return (
    <div className="section-modern min-h-screen">
      <div className="section-content">
        <Navigation />

        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* Left Column - Benefits */}
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-2">
                      <Download className="text-accent" size={32} />
                      <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold uppercase text-accent-dark-text">
                        Gratuito
                      </span>
                    </div>

                    <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
                      Checklist Completo
                      <br />
                      <span className="text-accent">ENEM 2025</span>
                    </h1>

                    <p className="mb-6 text-lg font-light text-white/85">
                      Tenha em suas mãos o guia definitivo para não perder nenhum detalhe importante
                      na sua preparação para o ENEM 2025.
                    </p>
                  </div>

                  <div className="mb-8 space-y-4">
                    <h3 className="flex items-center text-xl font-semibold text-white">
                      <Star className="mr-2 text-accent" size={20} />O que você vai receber:
                    </h3>

                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-3 mt-0.5 shrink-0 text-accent" size={18} />
                          <span className="font-light text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="text-accent" size={20} />
                      <span className="font-semibold text-accent">Acesso Imediato</span>
                    </div>
                    <p className="text-sm font-light text-white/80">
                      Após preencher o formulário, você receberá o link para download instantâneo do
                      PDF.
                    </p>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div>
                  <div className="card-navy rounded-xl border-2 border-white/20 p-8 shadow-xl">
                    <div className="mb-6 text-center">
                      <h2 className="mb-2 text-2xl font-semibold text-white">
                        Baixe seu checklist gratuito
                      </h2>
                      <p className="font-light text-white/80">
                        Preencha seus dados e tenha acesso imediato
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Nome completo *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                          className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                          className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-white">
                          WhatsApp *
                        </Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                          required
                          className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="btn-yellow w-full py-6 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Enviando...'
                        ) : (
                          <>
                            <Download className="mr-2" size={20} />
                            Receber Checklist Agora
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs font-light text-white/70">
                        Seus dados estão seguros. Não compartilhamos com terceiros.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
