import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

export const GuiaLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      const { error } = await supabase
        .from('guia_leads')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim()
        });

      if (error) throw error;

      trackEvent('lead_submit', {
        form_type: 'guia_gratuito',
        source: 'hero_section'
      });

      toast({
        title: "Sucesso!",
        description: "Em breve você receberá o guia no seu email.",
      });

      setFormData({ name: '', email: '', whatsapp: '' });

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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
        Baixe GRÁTIS o Guia dos Temas + Apostas 2025
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="guia-name" className="text-[#1E3A8A]">Nome completo</Label>
        <Input
          id="guia-name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guia-email" className="text-[#1E3A8A]">E-mail</Label>
        <Input
          id="guia-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guia-whatsapp" className="text-[#1E3A8A]">WhatsApp</Label>
        <Input
          id="guia-whatsapp"
          value={formData.whatsapp}
          onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
          placeholder="(11) 99999-9999"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#FBBF24] text-white font-semibold py-6 text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Quero o Guia Gratuito'}
      </Button>
    </form>
  );
};
