import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { ChevronUp, CheckCircle } from 'lucide-react';

export const StickyFormBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    lgpdAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section[class*="bg-gradient"]') as HTMLElement;
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrolled = window.scrollY;
        const shouldShow = scrolled > heroHeight * 0.5;
        setIsVisible(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      trackEvent('sticky_form_open', { source: 'mobile_sticky_bar' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.nome.length < 2) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (formData.telefone.length < 10) {
      setError('WhatsApp inválido');
      return;
    }

    if (!formData.lgpdAccepted) {
      setError('Você precisa autorizar o contato');
      return;
    }

    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direto';
      const utmMedium = urlParams.get('utm_medium') || 'site';
      const utmCampaign = urlParams.get('utm_campaign') || 'sticky_form';

      const { error: insertError } = await supabase.from('leads').insert({
        name: formData.nome,
        email: '', // Required field, empty for phone-only forms
        phone: formData.telefone,
        lead_type: 'contratacao',
        service_selected: 'aula_correcao',
        message: 'Lead capturado via sticky_miniform',
        source: `sticky_miniform|utm_source:${utmSource}|utm_medium:${utmMedium}|utm_campaign:${utmCampaign}`,
      });

      if (insertError) {
        console.error('Erro ao inserir lead:', insertError);
        setError('Erro ao enviar dados. Tente novamente.');
        return;
      }

      trackEvent('sticky_form_submit', {
        source: 'sticky_miniform',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setFormData({ nome: '', telefone: '', lgpdAccepted: false });
      }, 3000);
    } catch (err) {
      console.error('Erro no envio:', err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button
            className="flex w-full items-center justify-between rounded-none bg-primary px-6 py-4 text-primary-foreground hover:bg-primary-hover"
            size="lg"
          >
            <span className="font-semibold">Contrate agora sua aula/correção</span>
            <ChevronUp className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="h-auto">
          <SheetHeader>
            <SheetTitle>Contrate agora</SheetTitle>
          </SheetHeader>

          {isSubmitted ? (
            <div className="py-6 text-center">
              <CheckCircle className="mx-auto mb-3 size-12 text-success" />
              <h3 className="mb-2 text-lg font-bold">
                Recebido! Vamos falar com você em instantes.
              </h3>
              <p className="text-sm text-muted-foreground">Você pode fechar esta janela.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="sticky-nome" className="text-sm font-medium">
                  Nome completo *
                </Label>
                <Input
                  id="sticky-nome"
                  type="text"
                  value={formData.nome}
                  onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Seu nome"
                  required
                  minLength={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sticky-telefone" className="text-sm font-medium">
                  WhatsApp *
                </Label>
                <Input
                  id="sticky-telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="sticky-lgpd"
                  checked={formData.lgpdAccepted}
                  onCheckedChange={checked =>
                    setFormData(prev => ({ ...prev, lgpdAccepted: !!checked }))
                  }
                  required
                />
                <Label
                  htmlFor="sticky-lgpd"
                  className="text-xs leading-relaxed text-muted-foreground"
                >
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
                className="w-full bg-primary hover:bg-primary-hover"
                size="lg"
              >
                {isSubmitting ? 'Enviando...' : 'Quero contratar agora'}
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
