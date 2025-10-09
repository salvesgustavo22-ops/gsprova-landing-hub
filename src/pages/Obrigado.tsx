import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const Obrigado = () => {
  useEffect(() => {
    // Update page title and meta description
    document.title = 'Obrigado - GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Cadastro recebido! Seu curso começará em 03/10/2025. Garantia 7 dias com devolução integral.'
      );
    }
  }, []);

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { label: 'obrigado' });
    const message = encodeURIComponent(
      'Oi! Acabei de me cadastrar no site. Quero mais informações sobre os cursos.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleVerPlanos = () => {
    trackEvent('button_click', { label: 'ver_planos_obrigado' });
    window.location.href = '/planos';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto max-w-2xl px-4">
            <Card className="rounded-xl border border-border/50 bg-card shadow-lg">
              <CardContent className="p-8 text-center">
                <CheckCircle className="mx-auto mb-6 size-16 text-success" />
                <h1 className="mb-4 text-3xl font-bold text-foreground">Cadastro recebido!</h1>
                <div className="mb-8 space-y-4">
                  <p className="text-lg text-foreground">
                    Obrigado! Seu curso começará em <strong>03/10/2025</strong>.
                  </p>
                  <p className="text-muted-foreground">
                    Fique de olho no seu e-mail e WhatsApp para orientações de acesso.
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button onClick={handleWhatsAppClick} size="lg" className="min-w-[200px]">
                    Falar no WhatsApp
                  </Button>
                  <Button
                    onClick={handleVerPlanos}
                    variant="outline"
                    size="lg"
                    className="min-w-[200px]"
                  >
                    Ver planos e benefícios
                  </Button>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="size-4" />
                  <span>Garantia 7 dias — cancelamento com devolução integral</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Obrigado;
