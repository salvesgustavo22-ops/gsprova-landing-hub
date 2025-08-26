import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircleIcon, ArrowLeft } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

interface FormData {
  nome: string;
  interesse: string;
  necessidade: string;
  contato: string;
  aceitaWhatsapp: boolean;
}

const Contato = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    interesse: "",
    necessidade: "",
    contato: "",
    aceitaWhatsapp: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, contato: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone has 11 digits
    const phoneNumbers = formData.contato.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      alert('Por favor, insira um número de telefone com 11 dígitos');
      return;
    }

    setIsSubmitting(true);
    
    // Here you would save to Supabase
    console.log('Form data:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Contact Form WhatsApp', 'contact-form');
    const message = encodeURIComponent("Oi, acabei de enviar uma solicitação pelo formulário do site. Gostaria de falar sobre minha necessidade.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-foreground">
              Solicitação Enviada!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Recebemos sua solicitação e responderemos o mais breve possível.
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-success text-success-foreground hover:bg-success/90 flex items-center gap-2"
            >
              <MessageCircleIcon className="w-4 h-4" />
              Falar no WhatsApp Agora
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Voltar ao Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Site
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Solicitar Contato
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Preencha o formulário abaixo e entraremos em contato
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interesse">Interesse *</Label>
                <Select 
                  value={formData.interesse} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, interesse: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu interesse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aula-matematica">Aula de Matemática</SelectItem>
                    <SelectItem value="correcao-redacao">Correção de Redação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="necessidade">Descreva sua necessidade *</Label>
                <Textarea
                  id="necessidade"
                  value={formData.necessidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, necessidade: e.target.value }))}
                  required
                  placeholder="Conte-nos sobre suas dificuldades, objetivos e como podemos ajudar..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contato">Contato (WhatsApp) *</Label>
                <Input
                  id="contato"
                  type="text"
                  value={formData.contato}
                  onChange={handlePhoneChange}
                  required
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aceita-whatsapp"
                  checked={formData.aceitaWhatsapp}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, aceitaWhatsapp: checked as boolean }))
                  }
                  required
                />
                <Label htmlFor="aceita-whatsapp" className="text-sm">
                  Aceito contato via WhatsApp *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Interesse"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contato;