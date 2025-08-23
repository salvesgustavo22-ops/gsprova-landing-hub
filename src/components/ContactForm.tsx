import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  whatsapp: string;
  service: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this to your backend
      console.log('Form submitted:', formData);
      
      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato via WhatsApp em breve.",
      });

      // Reset form
      setFormData({
        name: '',
        whatsapp: '',
        service: '',
        message: ''
      });

      // Track the lead submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_submit', {
          event_category: 'conversion',
          service_interest: formData.service
        });
      }

    } catch (error) {
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
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Serviço de interesse</Label>
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
                  <Label htmlFor="message">Mensagem (opcional)</Label>
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
                <p className="text-sm text-muted-foreground mb-4">
                  Ou entre em contato diretamente:
                </p>
                <Button 
                  onClick={() => {
                    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
                    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
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