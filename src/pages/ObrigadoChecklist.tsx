import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Download, MessageCircle } from 'lucide-react';
import { trackConversion, trackWhatsAppClick } from '@/lib/analytics';

export default function ObrigadoChecklist() {
  useEffect(() => {
    document.title = 'Download do Checklist ENEM 2025 | GS Aprova';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Baixe seu checklist ENEM 2025 e comece a estudar de forma direcionada. Fale com nossa equipe para turbinar seus estudos.'
      );
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
    const message = encodeURIComponent(
      'Oi! Acabei de baixar o checklist ENEM 2025 e quero saber mais sobre os serviços do GS Aprova.'
    );
    window.open(`https://wa.me/5511985363890?text=${message}`, '_blank');
  };

  return (
    <div className="section-modern min-h-screen">
      <div className="section-content">
        <Navigation />

        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Success Message */}
              <div className="mb-12 text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle className="text-accent" size={40} />
                </div>

                <h1 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  Pronto! Seu checklist está disponível
                </h1>

                <p className="mb-8 text-lg font-light text-white/85">
                  Agora você tem em suas mãos tudo o que precisa para se preparar de forma
                  direcionada para o ENEM 2025.
                </p>
              </div>

              {/* Download Section */}
              <div className="card-navy mb-12 rounded-xl border-2 border-accent/30 p-8">
                <div className="mb-6 text-center">
                  <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl text-white">
                    <Download className="text-accent" size={28} />
                    Baixar Checklist ENEM 2025
                  </h2>
                  <p className="font-light text-white/80">
                    PDF completo com cronograma, tópicos essenciais e estratégias
                  </p>
                </div>

                <div className="text-center">
                  <Button onClick={handleDownload} className="btn-yellow mb-4 px-12 py-6 text-lg">
                    <Download className="mr-2" size={20} />
                    Baixar Checklist Agora
                  </Button>

                  <p className="text-sm font-light text-white/70">
                    ✓ Download gratuito • ✓ Acesso permanente • ✓ 20 páginas de conteúdo
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="card-navy rounded-xl p-12 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                  Quer acelerar seus resultados?
                </h2>

                <p className="mb-6 text-lg font-light text-white/85">
                  Fale com nossa equipe e descubra como podemos personalizar sua preparação com
                  aulas de matemática, correção de redação e trilha de estudos.
                </p>

                <Button onClick={handleWhatsAppClick} className="btn-yellow px-10 py-6 text-lg">
                  <MessageCircle className="mr-2" size={20} />
                  Falar com a Equipe no WhatsApp
                </Button>

                <p className="mt-4 text-sm font-light text-white/70">
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
