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
    <div className="min-h-screen section-modern">
      <div className="section-content">
        <Navigation />
        
        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Success Message */}
              <div className="text-center mb-12">
                <div className="bg-accent/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-accent" size={40} />
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Pronto! Seu checklist está disponível
                </h1>
                
                <p className="text-lg text-white/85 mb-8 font-light">
                  Agora você tem em suas mãos tudo o que precisa para se preparar de forma direcionada para o ENEM 2025.
                </p>
              </div>

              {/* Download Section */}
              <div className="card-navy mb-12 border-2 border-accent/30 p-8 rounded-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl flex items-center justify-center gap-2 text-white mb-4">
                    <Download className="text-accent" size={28} />
                    Baixar Checklist ENEM 2025
                  </h2>
                  <p className="text-white/80 font-light">
                    PDF completo com cronograma, tópicos essenciais e estratégias
                  </p>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={handleDownload}
                    className="btn-yellow py-6 px-12 text-lg mb-4"
                  >
                    <Download className="mr-2" size={20} />
                    Baixar Checklist Agora
                  </Button>
                  
                  <p className="text-sm text-white/70 font-light">
                    ✓ Download gratuito • ✓ Acesso permanente • ✓ 20 páginas de conteúdo
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="card-navy p-12 rounded-xl text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                  Quer acelerar seus resultados?
                </h2>
                
                <p className="text-white/85 mb-6 text-lg font-light">
                  Fale com nossa equipe e descubra como podemos personalizar sua preparação com aulas de matemática, correção de redação e trilha de estudos.
                </p>

                <Button
                  onClick={handleWhatsAppClick}
                  className="btn-yellow py-6 px-10 text-lg"
                >
                  <MessageCircle className="mr-2" size={20} />
                  Falar com a Equipe no WhatsApp
                </Button>
                
                <p className="text-white/70 text-sm mt-4 font-light">
                  ⚡ Resposta rápida • 💯 Orientação gratuita • 🎯 Plano personalizado
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        </div>
      </div>
  );
}