import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { Target } from 'lucide-react';

export const EmailPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('gs_aprova_email_popup');
    const lastShown = hasSeenPopup ? parseInt(hasSeenPopup) : 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    // Show popup after 3 seconds if not shown in last 7 days
    if (now - lastShown > sevenDays) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        trackEvent('popup_shown', { type: 'email_capture' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('gs_aprova_email_popup', Date.now().toString());
    trackEvent('popup_closed', { type: 'email_capture', action: 'manual_close' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('guia_leads').insert({
        name: 'Popup Email',
        email: email.trim(),
        whatsapp: 'N/A',
      });

      if (error) throw error;

      trackEvent('popup_email_submit', {
        source: 'entrance_popup',
      });

      toast({
        title: 'Sucesso!',
        description: 'Você receberá nossas atualizações e dicas exclusivas!',
      });

      localStorage.setItem('gs_aprova_email_popup', Date.now().toString());
      setIsOpen(false);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-2 border-[#FBBF24] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
        <DialogHeader>
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-full bg-[#FBBF24] p-3">
              <Target className="size-8 text-[#1E3A8A]" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl text-white">
            🎯 Dicas Exclusivas ENEM 2025
          </DialogTitle>
        </DialogHeader>

        <p className="mb-6 text-center text-white/90">
          Receba atualizações sobre os temas que mais caem + dicas de estudo direto no seu email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="popup-email" className="text-white">
              Email
            </Label>
            <Input
              id="popup-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="border-[#FBBF24] bg-white text-[#1E3A8A]"
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1 bg-[#FBBF24] font-bold text-[#1E3A8A] hover:brightness-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Quero Receber'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-white hover:bg-white/20"
            >
              Fechar
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-white/70">
          Não enviaremos spam. Você pode cancelar a qualquer momento.
        </p>
      </DialogContent>
    </Dialog>
  );
};
