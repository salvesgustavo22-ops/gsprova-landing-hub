import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { Download, CheckCircle, FileText } from "lucide-react";

export const LeadMagnet = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.nome.length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }

    if (formData.telefone.length < 10) {
      setError("WhatsApp inválido");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direto';
      const utmMedium = urlParams.get('utm_medium') || 'site';
      const utmCampaign = urlParams.get('utm_campaign') || 'leadmagnet';

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          lead_type: 'leadmagnet',
          service_selected: 'checklist_enem',
          message: 'Solicitou checklist ENEM via lead magnet',
          source: `leadmagnet|utm_source:${utmSource}|utm_medium:${utmMedium}|utm_campaign:${utmCampaign}`
        });

      if (insertError) {
        console.error('Erro ao inserir lead:', insertError);
        setError("Erro ao enviar dados. Tente novamente.");
        return;
      }

      // Track analytics
      trackEvent('lead_submit', {
        form: 'leadmagnet',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Erro no envio:', err);
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card shadow-lg rounded-xl border border-border/50">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Obrigado! O checklist está no seu e-mail.
                </h3>
                <p className="text-muted-foreground mb-6">
                  Verifique sua caixa de entrada e spam. Em instantes você receberá o PDF com os 10 erros mais comuns em redações do ENEM.
                </p>
                <Button
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Ver nossos planos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card shadow-lg rounded-xl border border-border/50">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                <h2>Checklist: 10 erros que derrubam a sua redação</h2>
              </CardTitle>
              <p className="text-muted-foreground">
                Receba agora o PDF + mini-diagnóstico gratuito
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-nome" className="text-sm font-medium">
                    Nome completo *
                  </Label>
                  <Input
                    id="lead-nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Seu nome"
                    required
                    minLength={2}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-telefone" className="text-sm font-medium">
                    WhatsApp *
                  </Label>
                  <Input
                    id="lead-telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    required
                    className="w-full"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-hover"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Enviando..." : "Baixar checklist gratuito"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Seus dados são protegidos. Não fazemos spam.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};