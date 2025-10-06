import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  whatsapp: string;
  service: string;
  message: string;
  email: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    service: '',
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting: prevent submissions within 30 seconds
    const now = Date.now();
    if (now - lastSubmission < 30000) {
      toast({
        title: "Aguarde um momento",
        description: "Aguarde 30 segundos antes de enviar outra solicitação.",
        variant: "destructive"
      });
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.service) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.whatsapp.trim(),
          lead_type: 'contact_form',
          service_selected: formData.service,
          message: formData.message.trim() || null,
          source: 'homepage_contact'
        });

      if (error) {
        throw error;
      }

      // Track successful submission
      trackEvent('lead_submit', {
        form_type: 'homepage_contact',
        service_interest: formData.service
      });

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato via WhatsApp em breve.",
      });

      // Reset form and update rate limiting
      setFormData({
        name: '',
        whatsapp: '',
        service: '',
        message: '',
        email: ''
      });
      setLastSubmission(now);

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

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="card-service">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl lg:text-3xl">
                Solicite seu Atendimento
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha o formulário e entraremos em contato via WhatsApp para agendar sua aula ou correção.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1E3A8A]">Nome completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1E3A8A]">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[#1E3A8A]">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-[#1E3A8A]">Serviço de interesse</Label>
                  <Select onValueChange={(value) => handleChange('service', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math-single">Matemática - Aula Avulsa</SelectItem>
                      <SelectItem value="math-package">Matemática - Pacote 4 Aulas</SelectItem>
                      <SelectItem value="essay-single">Redação - Correção Avulsa</SelectItem>
                      <SelectItem value="essay-package">Redação - Pacote Completo</SelectItem>
                      <SelectItem value="both">Matemática + Redação</SelectItem>
                      <SelectItem value="doubt">Tenho dúvidas, quero conversar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#1E3A8A]">Mensagem (opcional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Conte-nos suas principais dificuldades ou objetivos..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-hero text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-[#1E3A8A] mb-4">
                  Ou entre em contato diretamente:
                </p>
                <Button 
                  onClick={() => {
                    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
                    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
                  }}
                  variant="outline"
                  className="border-success text-success hover:bg-success hover:text-success-foreground"
                >
                  WhatsApp Direto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};