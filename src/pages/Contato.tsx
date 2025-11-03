import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircleIcon, ArrowLeft, CheckCircle } from 'lucide-react';
import {
  trackWhatsAppClick,
  trackFormStart,
  trackFormSubmit,
  trackConversion,
} from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
  accepts_whatsapp: boolean;
}

const Contato = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
    accepts_whatsapp: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { toast } = useToast();

  // Track form start on first interaction
  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      trackFormStart('contact_page_form');
      setHasInteracted(true);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone has 11 digits
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      toast({
        title: 'Número inválido',
        description: 'Digite um número de WhatsApp com 11 dígitos',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_selected: formData.service_interest,
        message: formData.message,
        lead_type: 'contact_form',
        source: 'contact_page',
      });

      if (error) throw error;

      setIsSubmitted(true);

      // Track successful form submission and conversion
      trackFormSubmit('contact_page_form', formData.service_interest);
      trackConversion('contact_form_submission');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente ou fale direto no WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact_success_cta');
    const message = encodeURIComponent(
      'Oi, acabei de enviar uma solicitação pelo formulário do site. Gostaria de falar sobre minha necessidade.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-4 dark:bg-[#0F172A]">
        <Card className="w-full max-w-md border-0 bg-white shadow-2xl dark:bg-[#1E3A8A]">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#22C55E]">
              <CheckCircle className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#1E3A8A] dark:text-white">
              Pronto! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium text-[#1E3A8A] dark:text-white">
                Seu interesse foi enviado
              </p>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/80">
                Responderemos no seu WhatsApp em até 2 horas. Já vamos preparar sua trilha!
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppClick}
                className="flex h-12 w-full items-center justify-center gap-3 bg-[#22C55E] text-base font-semibold text-white hover:bg-[#22C55E]/90"
              >
                <MessageCircleIcon className="size-5" />
                Acelerar no WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
                className="h-12 w-full border-[#1E3A8A] text-base text-[#1E3A8A] hover:bg-[#1E3A8A]/10 dark:border-white dark:text-white dark:hover:bg-white/10"
              >
                Voltar ao site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 dark:bg-[#0F172A]">
      <div className="container mx-auto max-w-lg pt-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = '/')}
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Button>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-[#1E3A8A] dark:text-white">
              Contato
            </h1>
            <p className="text-base leading-relaxed text-gray-600 dark:text-white/80">
              Preenche aí que já preparamos sua trilha de estudos. Resposta em até 2 horas no
              WhatsApp.
            </p>
          </div>
        </div>

        <Card className="border-0 bg-white shadow-2xl dark:bg-[#1E3A8A]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium">
                  Qual seu nome? *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => {
                    handleFirstInteraction();
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                  }}
                  required
                  placeholder="Digite seu nome"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Seu WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  Seu E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => {
                    handleFirstInteraction();
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                  }}
                  required
                  placeholder="seu@email.com"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="service" className="text-sm font-medium">
                  No que você quer focar? *
                </Label>
                <Select
                  value={formData.service_interest}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, service_interest: value }))
                  }
                  required
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Escolhe aí" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematica">📊 Matemática (aulas práticas)</SelectItem>
                    <SelectItem value="redacao">✍️ Redação (correção detalhada)</SelectItem>
                    <SelectItem value="trilha">🎯 Trilha personalizada</SelectItem>
                    <SelectItem value="tudo">
                      🔥 Quero tudo (matemática + redação + trilha)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-medium">
                  Conta um pouco sua situação (opcional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Ex: Tenho dificuldade em funções, quero tirar 800+ na redação..."
                  rows={3}
                  className="text-base"
                />
              </div>

              <div className="flex items-start space-x-3 rounded-lg bg-accent/20 p-4">
                <Checkbox
                  id="accepts-whatsapp"
                  checked={formData.accepts_whatsapp}
                  onCheckedChange={checked =>
                    setFormData(prev => ({ ...prev, accepts_whatsapp: checked as boolean }))
                  }
                  required
                  className="mt-0.5"
                />
                <Label htmlFor="accepts-whatsapp" className="text-sm leading-relaxed">
                  Aceito receber contato no WhatsApp para agendar aulas e receber materiais de
                  estudo *
                </Label>
              </div>

              <Button
                type="submit"
                className="h-14 w-full bg-[#FBBF24] text-lg font-bold text-[#1E3A8A] hover:brightness-95"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar meu interesse 🎯'}
              </Button>

              <div className="border-t border-gray-200 pt-4 text-center dark:border-white/20">
                <p className="mb-3 text-xs text-gray-600 dark:text-white/70">
                  Ou fala direto com a gente:
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  className="h-10 border-[#22C55E] text-sm text-[#22C55E] hover:bg-[#22C55E] hover:text-white dark:border-[#22C55E] dark:text-[#22C55E]"
                >
                  <MessageCircleIcon className="mr-2 size-4" />
                  WhatsApp direto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contato;
