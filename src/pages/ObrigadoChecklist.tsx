import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle, Download, MessageCircle, Clock, Star } from "lucide-react";
import { trackConversion, trackWhatsAppClick } from "@/lib/analytics";

export default function ObrigadoChecklist() {
  useEffect(() => {
    document.title = "Download do Checklist ENEM 2025 | GS Aprova";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Baixe seu checklist ENEM 2025 e comece a estudar de forma direcionada. Fale com nossa equipe para turbinar seus estudos.");
    }

    // Track conversion
    trackConversion('checklist_download', 0, 'BRL');
  }, []);

  const handleDownload = () => {
    // Track download event
    trackConversion('pdf_download', 0, 'BRL');
    
    // Create download link
    const link = document.createElement('a');
    link.href = '/downloads/checklist-enem-2025.pdf';
    link.download = 'Checklist-ENEM-2025-GS-Aprova.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('thank_you_checklist', 'contact');
    const message = encodeURIComponent("Oi! Acabei de baixar o checklist ENEM 2025 e quero saber mais sobre os serviços do GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const nextSteps = [
    {
      icon: Download,
      title: "1. Baixe seu checklist",
      description: "Clique no botão abaixo para fazer o download do PDF completo"
    },
    {
      icon: Clock,
      title: "2. Organize seu tempo",
      description: "Use o cronograma incluído para planejar suas semanas de estudo"
    },
    {
      icon: Star,
      title: "3. Foque no essencial",
      description: "Priorize os tópicos marcados como 'alta frequência'"
    },
    {
      icon: MessageCircle,
      title: "4. Tire suas dúvidas",
      description: "Fale conosco no WhatsApp para orientações personalizadas"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Pronto! Seu checklist está disponível
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Agora você tem em suas mãos tudo o que precisa para se preparar de forma direcionada para o ENEM 2025.
              </p>
            </div>

            {/* Download Section */}
            <Card className="mb-12 border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Download className="text-primary" size={28} />
                  Baixar Checklist ENEM 2025
                </CardTitle>
                <p className="text-muted-foreground">
                  PDF completo com cronograma, tópicos essenciais e estratégias
                </p>
              </CardHeader>
              
              <CardContent className="text-center">
                <Button
                  onClick={handleDownload}
                  className="btn-hero bg-primary hover:bg-primary/90 text-white py-6 px-12 text-lg mb-4"
                >
                  <Download className="mr-2" size={20} />
                  Baixar Checklist Agora
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  ✓ Download gratuito • ✓ Acesso permanente • ✓ 20 páginas de conteúdo
                </p>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">
                Seus próximos passos para o sucesso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Icon className="text-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white">
              <CardContent className="text-center py-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Quer acelerar seus resultados?
                </h2>
                
                <p className="text-white/90 mb-6 text-lg">
                  Fale com nossa equipe e descubra como podemos personalizar sua preparação com aulas de matemática, correção de redação e trilha de estudos.
                </p>

                <Button
                  onClick={handleWhatsAppClick}
                  className="btn-hero bg-accent hover:bg-accent/90 text-primary py-6 px-10 text-lg"
                >
                  <MessageCircle className="mr-2" size={20} />
                  Falar com a Equipe no WhatsApp
                </Button>
                
                <p className="text-white/70 text-sm mt-4">
                  ⚡ Resposta rápida • 💯 Orientação gratuita • 🎯 Plano personalizado
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}