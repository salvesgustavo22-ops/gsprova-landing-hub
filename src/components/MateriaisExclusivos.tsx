import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type MaterialType = 'guia' | 'questoes';

export const MateriaisExclusivos = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleOpenForm = (type: MaterialType) => {
    setSelectedMaterial(type);
    trackEvent('material_interest', { material_type: type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const amount = selectedMaterial === 'guia' ? 9.90 : 15.90;
      
      const { error } = await supabase
        .from('material_purchases')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          material_type: selectedMaterial!,
          amount: amount
        });

      if (error) throw error;

      trackEvent('material_purchase_request', {
        material_type: selectedMaterial,
        amount: amount
      });

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato via WhatsApp para finalizar a compra.",
      });

      setFormData({ name: '', email: '', whatsapp: '' });
      setSelectedMaterial(null);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Materiais Exclusivos
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Conteúdos baseados na análise das provas oficiais INEP 2022-2024
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Guia Completo */}
          <Card className="bg-white border-2 border-[#FBBF24] hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-12 h-12 text-[#FBBF24]" />
                <span className="text-3xl font-bold text-[#1E3A8A]">R$ 9,90</span>
              </div>
              <CardTitle className="text-2xl text-[#1E3A8A]">
                Guia Completo de Matemática + Apostas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">Análise dos 5 blocos que representam 90% das questões</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">200+ lacunas temáticas identificadas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">Estratégias baseadas em dados oficiais INEP</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">Foco nos 35% de matemática básica</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handleOpenForm('guia')}
                className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#FBBF24] text-white font-semibold py-6 text-lg"
              >
                Garantir por R$ 9,90
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: 45 Questões */}
          <Card className="bg-white border-2 border-[#00FFFF] hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-12 h-12 text-[#00FFFF]" />
                <span className="text-3xl font-bold text-[#1E3A8A]">R$ 15,90</span>
              </div>
              <CardTitle className="text-2xl text-[#1E3A8A]">
                45 Questões Exclusivas com Gabarito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">70% temas mais recorrentes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">30% nossas apostas para 2025</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">Resoluções passo a passo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1E3A8A]">Nível ENEM autêntico</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handleOpenForm('questoes')}
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#00FFFF] text-[#1E3A8A] font-semibold py-6 text-lg"
              >
                Quero as Questões
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Formulário */}
      <Dialog open={selectedMaterial !== null} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1E3A8A]">
              {selectedMaterial === 'guia' ? 'Guia Completo - R$ 9,90' : '45 Questões - R$ 15,90'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="material-name" className="text-[#1E3A8A]">Nome completo</Label>
              <Input
                id="material-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material-email" className="text-[#1E3A8A]">E-mail</Label>
              <Input
                id="material-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material-whatsapp" className="text-[#1E3A8A]">WhatsApp</Label>
              <Input
                id="material-whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Interesse'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
