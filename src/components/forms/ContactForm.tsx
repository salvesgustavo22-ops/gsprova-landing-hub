import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { BUSINESS_WHATSAPP_URL } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

interface ContactFormProps {
  origem?: string;
  onSuccess?: () => void;
  'data-testid'?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

export const ContactForm = ({
  origem = 'contato-home',
  onSuccess,
  'data-testid': testId,
}: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    if (!formData.interest) {
      newErrors.interest = 'Selecione seu interesse';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        lead_type: 'contact',
        service_selected: formData.interest,
        source: origem,
      });

      if (error) throw error;

      // Track analytics event
      trackEvent('lead_submitted', {
        source: origem,
        service: formData.interest,
      });

      toast({
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato em breve.',
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', interest: '' });
      setErrors({});

      onSuccess?.();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { source: 'contact_form' });
    window.open(BUSINESS_WHATSAPP_URL, '_blank');
  };

  return (
    <Card
      data-testid={testId}
      className="rounded-2xl border-[#1E3A8A] bg-white shadow-lg dark:bg-[#1E3A8A] dark:text-white"
    >
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-[#1E3A8A] dark:text-white md:text-2xl">
          Fale Conosco
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Nome completo *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="text-sm text-red-500">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-sm text-red-500">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              WhatsApp *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              placeholder="(11) 99999-9999"
              className={errors.phone ? 'border-red-500' : ''}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="text-sm text-red-500">
                {errors.phone}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="interest" className="text-sm font-medium">
              Interesse *
            </Label>
            <Select
              value={formData.interest}
              onValueChange={value => setFormData({ ...formData, interest: value })}
            >
              <SelectTrigger className={errors.interest ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione seu interesse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="curso-intensivo">Curso Intensivo ENEM</SelectItem>
                <SelectItem value="correcao-redacao">Correção de Redação</SelectItem>
                <SelectItem value="mentoria">Mentoria Individual</SelectItem>
                <SelectItem value="combo">Combo Completo</SelectItem>
              </SelectContent>
            </Select>
            {errors.interest && <span className="text-sm text-red-500">{errors.interest}</span>}
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FBBF24] font-semibold text-[#1E3A8A] hover:brightness-95"
              data-analytics="cta_form_submit"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleWhatsAppClick}
              className="border-[#FBBF24] text-[#FBBF24] hover:bg-[#FBBF24] hover:text-[#1E3A8A]"
              data-analytics="cta_form_whatsapp"
            >
              <MessageCircle className="size-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
