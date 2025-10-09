import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => (window.location.href = '/')}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Voltar ao início
          </Button>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-primary">Termos de Uso</h1>
            <p className="text-xl text-muted-foreground">
              Conheça as condições de uso da plataforma GS Aprova
            </p>
          </div>

          {/* Terms Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="size-6 text-primary" />
                Terms of Use – GS Aprova
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none space-y-6">
              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">1. Acceptance</h3>
                <p className="leading-relaxed text-muted-foreground">
                  By accessing and using our platform, you agree to these Terms of Use.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">2. Services</h3>
                <p className="leading-relaxed text-muted-foreground">
                  GS Aprova provides study materials, essay correction services, and online classes.
                  Content is for educational purposes only.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  3. User responsibilities
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  You must provide accurate information when registering or using our services.
                  Sharing access credentials is prohibited.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">4. Payments</h3>
                <p className="leading-relaxed text-muted-foreground">
                  If you purchase any paid service, you agree to the payment conditions defined at
                  the moment of purchase.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  5. Intellectual property
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  All materials are owned by GS Aprova. You cannot copy, resell, or distribute
                  without prior written authorization.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">6. Changes</h3>
                <p className="leading-relaxed text-muted-foreground">
                  GS Aprova may update these Terms at any time. Changes will be posted on this page.
                </p>
              </section>

              <div className="mt-8 rounded-lg bg-accent/20 p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Última atualização:</strong> Janeiro de 2025
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Em caso de dúvidas sobre estes termos, entre em contato conosco através do
                  WhatsApp (11) 97496-9036.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => (window.location.href = '/contato')}
              variant="outline"
              className="px-8 py-3"
            >
              Tem dúvidas? Fale conosco
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
