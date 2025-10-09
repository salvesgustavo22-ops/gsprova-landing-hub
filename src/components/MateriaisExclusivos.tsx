import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, CheckCircle2, Zap } from "lucide-react";
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
    <section id="materiais-exclusivos" className="py-12 lg:py-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Matemática no enem 2025: os conteúdos que mais caem
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Análise completa das provas oficiais INEP 2022-2024 com foco nos temas mais recorrentes para o ENEM 2025
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Guia Completo */}
          <Card className="relative bg-white/5 backdrop-blur-sm border-2 border-white hover:border-white hover:bg-white/10 transition-all duration-300">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#DC2626] text-white px-4 py-1 flex items-center gap-1 animate-pulse">
              <Zap className="w-4 h-4" />
              PROMOÇÃO
            </Badge>
            
            <CardHeader className="pt-8">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-12 h-12 text-white" />
                <div className="text-right">
                  <div className="text-lg text-white/60 line-through">R$ 29,90</div>
                  <span className="text-3xl font-bold text-white">R$ 9,90</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                Guia Completo de Matemática + Apostas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Análise dos 5 eixos temáticos predominantes na prova</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">+ de 200 abordagens possíveis desse conteúdo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Estratégias baseadas em dados oficiais do INEP</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handleOpenForm('guia')}
                className="w-full bg-white hover:bg-white/90 text-[#1E3A8A] font-semibold py-6 text-lg"
              >
                Garantir por R$ 9,90
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Pacote Completo */}
          <Card className="relative bg-[#FBBF24]/10 backdrop-blur-sm border-2 border-[#FBBF24] hover:border-[#FBBF24] hover:bg-[#FBBF24]/20 transition-all duration-300 transform hover:scale-[1.02]">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F59E0B] text-white px-4 py-1 flex items-center gap-1 animate-pulse">
              <Zap className="w-4 h-4" />
              SUPER OFERTA
            </Badge>
            
            <CardHeader className="pt-8">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-12 h-12 text-[#FBBF24]" />
                <div className="text-right">
                  <div className="text-lg text-[#FBBF24]/60 line-through">R$ 49,90</div>
                  <span className="text-3xl font-bold text-[#FBBF24]">R$ 15,90</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-[#FBBF24]">
                Pacote Completo: Guia + 45 Questões
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">✅ Tudo do Guia Completo (análise + lacunas + estratégias)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">✅ 45 questões exclusivas (70% recorrentes + 30% apostas)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">✅ Resoluções detalhadas passo a passo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">✅ Material completo para maximizar sua nota</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handleOpenForm('questoes')}
                className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E3A8A] font-semibold py-6 text-lg"
              >
                Quero o Pacote Completo — R$ 15,90
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
