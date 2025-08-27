import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircleIcon, ArrowLeft, CheckCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  phone: string;
  service_interest: string;
  message: string;
  accepts_whatsapp: boolean;
}

const Contato = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service_interest: "",
    message: "",
    accepts_whatsapp: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone has 11 digits
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      toast({
        title: "Número inválido",
        description: "Digite um número de WhatsApp com 11 dígitos",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          phone: formData.phone,
          service_interest: formData.service_interest,
          message: formData.message,
          accepts_whatsapp: formData.accepts_whatsapp,
          form_type: 'contact_page'
        });

      if (error) throw error;

      setIsSubmitted(true);
      
      // Track conversion
      trackWhatsAppClick('Form Submit Success', 'contact-page');
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou fale direto no WhatsApp",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Contact Form WhatsApp', 'contact-form');
    const message = encodeURIComponent("Oi, acabei de enviar uma solicitação pelo formulário do site. Gostaria de falar sobre minha necessidade.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Pronto! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium text-primary">
                Seu interesse foi enviado
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Responderemos no seu WhatsApp em até 2 horas.
                Já vamos preparar sua trilha!
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full h-12 bg-success text-white hover:bg-success/90 flex items-center justify-center gap-3 font-semibold text-base"
              >
                <MessageCircleIcon className="w-5 h-5" />
                Acelerar no WhatsApp
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full h-12 text-base"
              >
                Voltar ao site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-primary/10 p-4">
      <div className="container mx-auto max-w-lg pt-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-3">
              Vamos começar! 🚀
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Preenche aí que já preparamos sua trilha de estudos.
              Resposta em até 2 horas no WhatsApp.
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium">
                  Qual seu nome? *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Digite seu nome"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Seu WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="service" className="text-sm font-medium">
                  No que você quer focar? *
                </Label>
                <Select 
                  value={formData.service_interest} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, service_interest: value }))}
                  required
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Escolhe aí" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematica">📊 Matemática (aulas práticas)</SelectItem>
                    <SelectItem value="redacao">✍️ Redação (correção detalhada)</SelectItem>
                    <SelectItem value="trilha">🎯 Trilha personalizada</SelectItem>
                    <SelectItem value="tudo">🔥 Quero tudo (matemática + redação + trilha)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-medium">
                  Conta um pouco sua situação (opcional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Ex: Tenho dificuldade em funções, quero tirar 800+ na redação..."
                  rows={3}
                  className="text-base"
                />
              </div>

              <div className="flex items-start space-x-3 bg-accent/20 p-4 rounded-lg">
                <Checkbox
                  id="accepts-whatsapp"
                  checked={formData.accepts_whatsapp}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, accepts_whatsapp: checked as boolean }))
                  }
                  required
                  className="mt-0.5"
                />
                <Label htmlFor="accepts-whatsapp" className="text-sm leading-relaxed">
                  Aceito receber contato no WhatsApp para agendar aulas e receber materiais de estudo *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar meu interesse 🎯"}
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-3">
                  Ou fala direto com a gente:
                </p>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  className="text-sm h-10 border-success text-success hover:bg-success hover:text-white"
                >
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  WhatsApp direto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contato;