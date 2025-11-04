import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    vestibular: false,
    concursos: false,
    aulas_particulares: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('gs_aprova_newsletter_popup');
    const lastShown = hasSeenPopup ? parseInt(hasSeenPopup) : 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (now - lastShown > sevenDays) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('gs_aprova_newsletter_popup', Date.now().toString());
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
        name: 'Newsletter Signup',
        email: email.trim(),
        whatsapp: 'N/A',
        interest_vestibular: interests.vestibular,
        interest_concursos: interests.concursos,
        interest_aulas_particulares: interests.aulas_particulares,
      });

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Você receberá nossas atualizações em breve!',
      });

      localStorage.setItem('gs_aprova_newsletter_popup', Date.now().toString());
      setIsOpen(false);
      setEmail('');
      setInterests({ vestibular: false, concursos: false, aulas_particulares: false });
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
      <DialogContent className="max-w-md border-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        >
          <X className="size-5" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-white">
            📚 Receba novidades sobre vestibulares
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-white/90">
          Receba as novidades sobre vestibulares/concursos e conteúdos exclusivos para seus estudos
          no seu email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label className="text-white">Tenho interesse em:</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vestibular"
                checked={interests.vestibular}
                onCheckedChange={(checked) =>
                  setInterests(prev => ({ ...prev, vestibular: checked as boolean }))
                }
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
              />
              <Label htmlFor="vestibular" className="cursor-pointer text-white">
                Vestibular
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="concursos"
                checked={interests.concursos}
                onCheckedChange={(checked) =>
                  setInterests(prev => ({ ...prev, concursos: checked as boolean }))
                }
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
              />
              <Label htmlFor="concursos" className="cursor-pointer text-white">
                Concursos
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="aulas-particulares"
                checked={interests.aulas_particulares}
                onCheckedChange={(checked) =>
                  setInterests(prev => ({ ...prev, aulas_particulares: checked as boolean }))
                }
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
              />
              <Label htmlFor="aulas-particulares" className="cursor-pointer text-white">
                Aulas Particulares
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newsletter-email" className="text-white">
              Email
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="border-white/30 bg-white/10 text-white placeholder:text-white/50"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white font-bold text-gray-900 hover:bg-white/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>

        <p className="text-center text-xs text-white/70">
          Seus dados estão protegidos. Você pode cancelar a qualquer momento.
        </p>
      </DialogContent>
    </Dialog>
  );
};
