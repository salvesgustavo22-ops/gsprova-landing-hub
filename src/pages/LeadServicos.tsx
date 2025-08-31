import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Calculator, PenTool, Route, Layers, CheckCircle } from "lucide-react";
import { trackFormStart, trackFormSubmit, trackServiceSelection } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function LeadServicos() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = [
    {
      id: "matematica-online",
      name: "Matemática Online",
      icon: Calculator,
      description: "Aulas focadas nos tópicos que mais caem no ENEM e Fuvest",
      benefits: ["Lista do que mais cai", "Revisão de erros", "Plano de evolução"]
    },
    {
      id: "correcao-redacao",
      name: "Correção de Redação",
      icon: PenTool,
      description: "Correção personalizada linha a linha com critérios oficiais",
      benefits: ["Comentários por parágrafo", "Orientação de tese", "Sugestões de reescrita"]
    },
    {
      id: "trilha-personalizada",
      name: "Trilha Personalizada",
      icon: Route,
      description: "Cronograma de estudos adaptado ao seu perfil e objetivos",
      benefits: ["Cronograma personalizado", "Ajustes semanais", "Lembretes automáticos"]
    },
    {
      id: "plano-completo",
      name: "Plano Completo",
      icon: Layers,
      description: "Matemática + Redação + Trilha com acompanhamento integral",
      benefits: ["Acompanhamento contínuo", "Integração completa", "Foco em resultados"],
      popular: true
    }
  ];

  useEffect(() => {
    document.title = "Escolha seu Serviço | GS Aprova";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Escolha o serviço ideal para sua preparação: Matemática Online, Correção de Redação, Trilha Personalizada ou Plano Completo.");
    }

    trackFormStart('lead_servicos');

    // Check for pre-selected service from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service');
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    trackServiceSelection(value, 'lead_form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.whatsapp || !formData.service) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos e selecione um serviço.",
          variant: "destructive"
        });
        return;
      }

      // Save to Supabase
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.whatsapp.trim(),
          lead_type: 'service_interest',
          service_selected: formData.service,
          message: 'Interesse em contratar serviços educacionais',
          source: 'servicos_page'
        });

      if (error) {
        throw error;
      }
      
      trackFormSubmit('lead_servicos', formData.service);
      
      // Redirect to thank you page with service info
      window.location.href = `/obrigado-servicos?service=${formData.service}`;
      
    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen section-modern">
      <div className="section-content">
        <Navigation />
        
        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Escolha o serviço ideal para você
                </h1>
                <p className="text-lg text-white/85 font-light">
                  Preencha seus dados e receba informações detalhadas sobre o serviço escolhido
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Contact Information */}
                <div className="card-navy p-8 rounded-xl">
                  <h2 className="text-xl font-semibold text-white mb-6">Seus dados</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Nome completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-white">WhatsApp *</Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                          required
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                        className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="card-navy p-8 rounded-xl">
                  <h2 className="text-xl font-semibold text-white mb-6">Selecione o serviço *</h2>
                  <RadioGroup value={formData.service} onValueChange={handleServiceChange}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <div key={service.id} className="relative">
                            <RadioGroupItem
                              value={service.id}
                              id={service.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={service.id}
                              className={`flex flex-col p-4 rounded-lg cursor-pointer transition-all duration-300 relative ${
                                formData.service === service.id 
                                  ? 'card-navy-selected text-white' 
                                  : 'bg-white/5 border border-white/20 text-white/80 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {service.popular && (
                                <span className="absolute -top-2 -right-2 bg-accent text-accent-dark-text text-xs px-2 py-1 rounded-full font-bold">
                                  POPULAR
                                </span>
                              )}
                              
                              <div className="flex items-center gap-3 mb-2">
                                <Icon className="text-accent" size={24} />
                                <span className="font-semibold">{service.name}</span>
                              </div>
                              
                              <p className="text-sm mb-3 font-light opacity-80">
                                {service.description}
                              </p>
                              
                              <ul className="space-y-1">
                                {service.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-center text-xs">
                                    <CheckCircle className="mr-2 text-accent" size={12} />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn-yellow py-6 px-12 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Receber Informações Agora"}
                  </Button>
                  
                  <p className="text-xs text-white/70 mt-4 font-light">
                    Seus dados estão seguros. Não compartilhamos com terceiros.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
        </div>
      </div>
  );
}