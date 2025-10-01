import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL } from "@/lib/constants";
import { Shield, Clock, MessageCircle, CheckCircle } from "lucide-react";

interface MiniFormProps {
  source?: string;
}

export const MiniForm = ({ source = "hero_miniform" }: MiniFormProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    lgpdAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  // Track form view when it comes into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('hero_form_view', { source });
            observer.disconnect(); // Only track once
          }
        });
      },
      { threshold: 0.5 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, [source]);

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Apply mask +55 (__) _____-____
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
    setError("");

    // Validation
    if (formData.nome.length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres");
      return;
    }

    if (formData.telefone.length < 10) {
      setError("WhatsApp inválido");
      return;
    }

    if (!formData.lgpdAccepted) {
      setError("Você precisa autorizar o contato");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direto';
      const utmMedium = urlParams.get('utm_medium') || 'site';
      const utmCampaign = urlParams.get('utm_campaign') || 'hero_form';

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name: formData.nome,
          email: '', // Required field, empty for phone-only forms
          phone: formData.telefone,
          lead_type: 'contratacao',
          service_selected: 'aula_correcao',
          message: `Lead capturado via ${source}`,
          source: `${source}|utm_source:${utmSource}|utm_medium:${utmMedium}|utm_campaign:${utmCampaign}`
        });

      if (insertError) {
        console.error('Erro ao inserir lead:', insertError);
        setError("Erro ao enviar dados. Tente novamente.");
        return;
      }

      // Track analytics
      trackEvent('hero_form_submit', {
        source,
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

  const handleWhatsAppClick = () => {
    trackEvent('hero_whatsapp_click', { source: 'form_success' });
    const message = encodeURIComponent("Oi! Acabei de preencher o formulário no site. Quero contratar aula ou correção de redação.");
    window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <Card className="bg-card shadow-lg rounded-xl border border-border/50">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">
              Recebido! Vamos falar com você em instantes.
            </h3>
            <p className="text-sm text-[#1E3A8A]">
              Enquanto isso, conheça nossos planos.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              Tirar dúvidas no WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Ver planos
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div ref={formRef}>
      <Card className="bg-card shadow-lg rounded-xl border border-border/50">
      <CardHeader className="pb-4">
        <Badge variant="destructive" className="w-fit mb-2">
          Vagas limitadas
        </Badge>
        <h3 className="text-lg font-bold text-foreground">
          Contrate agora a aula ou sua correção de redações
        </h3>
        <p className="text-sm text-[#1E3A8A]">
          Preencha e falamos com você em minutos.
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium">
              Nome completo *
            </Label>
            <Input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Seu nome"
              required
              minLength={2}
              className="w-full"
              aria-describedby="nome-error"
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
              className="w-full"
              aria-describedby="telefone-error"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="lgpd"
              checked={formData.lgpdAccepted}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, lgpdAccepted: !!checked }))
              }
              required
              aria-describedby="lgpd-error"
            />
            <Label htmlFor="lgpd" className="text-xs text-[#1E3A8A] leading-relaxed">
              Autorizo contato do GS Aprova. *
            </Label>
          </div>

          <p className="text-xs text-[#1E3A8A]">
            Seus dados não serão compartilhados.
          </p>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover"
          >
            {isSubmitting ? "Enviando..." : "Quero contratar agora"}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-[#1E3A8A]">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Resposta rápida</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-3 h-3" />
            <span>Suporte no WhatsApp</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Garantia 7 dias</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};