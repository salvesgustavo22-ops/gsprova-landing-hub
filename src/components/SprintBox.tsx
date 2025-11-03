import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Check } from 'lucide-react';

export const SprintBox = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInitialClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    setShowFormDialog(true);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: After creating sprint_leads table in Supabase, uncomment this
      // const { error } = await supabase.from('sprint_leads').insert({
      //   name: formData.name.trim(),
      //   email: formData.email.trim(),
      //   phone: formData.phone.replace(/\D/g, ''),
      // });

      // Temporary: Store in service_leads until sprint_leads table is created
      const { error } = await supabase.from('service_leads').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        whatsapp: formData.phone.replace(/\D/g, ''),
        service_type: 'sprint_redacao_900',
        message: 'Sprint Redação 900+ - Lead',
      });

      if (error) throw error;

      toast({
        title: 'Dados recebidos!',
        description: 'Você será redirecionado para a loja da Hotmart.',
      });

      // Redirect to Hotmart
      window.open('https://hotmart.com/pt-br/marketplace/produtos/sprint-redacao-900-enem/B102743419P', '_blank');

      setShowFormDialog(false);
      setFormData({ name: '', email: '', phone: '' });
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

  return (
    <>
      <Card className="border-2 border-[#FBBF24] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[#FBBF24] p-4">
              <BookOpen className="size-12 text-[#1E3A8A]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            Sprint Redação 900+ 🚀
          </CardTitle>
          <p className="mt-2 text-lg text-white/90">
            Guia de estudos com 8 módulos para construir a redação nota 900 no ENEM
          </p>
          <div className="mt-4 text-center">
            <div className="mb-1 text-sm text-white/70 line-through">De R$ 35,90</div>
            <div className="text-4xl font-bold text-[#FBBF24]">R$ 17,90</div>
            <div className="mt-1 text-sm font-semibold text-white">🔥 Super Promoção!</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">O que você vai aprender:</h3>
            <ul className="space-y-2">
              {[
                'Entenda definitivamente do que dependerá sua nota',
                'Construção de cada elemento dissertativo (introdução, argumentação, proposta)',
                'Instrumentos de coesão textual',
                'Apostas de temas e sugestões de repertório',
                'Exercícios práticos',
                'Mindfulness e técnicas de concentração',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white">
                  <Check className="mt-1 size-5 shrink-0 text-[#FBBF24]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={handleInitialClick}
            className="w-full bg-[#FBBF24] py-6 text-lg font-bold text-[#1E3A8A] hover:brightness-95"
            size="lg"
          >
            Quero Garantir Meu Guia
          </Button>

          <div className="rounded-lg bg-white/10 p-3 text-center text-sm text-white">
            💳 Pagamento via PIX ou Cartão | 📧 Nota Fiscal | 🎧 Suporte 7 dias
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Aquisição via Hotmart</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              A compra do Sprint Redação 900+ será realizada em nossa loja segura na Hotmart.
            </p>
            <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
              <p>
                <strong>💰 Preço:</strong> R$ 17,90 (promoção)
              </p>
              <p>
                <strong>💳 Pagamento:</strong> PIX, Cartão de Crédito ou Boleto
              </p>
              <p>
                <strong>📧 Nota Fiscal:</strong> Emitida automaticamente pela Hotmart
              </p>
              <p>
                <strong>📥 Entrega:</strong> Acesso imediato após aprovação do pagamento
              </p>
              <p>
                <strong>🛡️ Garantia:</strong> 7 dias de garantia Hotmart
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Antes de prosseguir para a loja, preencha seus dados:
            </p>
            <Button onClick={handleConfirm} className="w-full" size="lg">
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Seus Dados</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sprint-name">Nome completo *</Label>
              <Input
                id="sprint-name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sprint-email">E-mail *</Label>
              <Input
                id="sprint-email"
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sprint-phone">Celular *</Label>
              <Input
                id="sprint-phone"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Ir para a Loja Hotmart'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
