import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy = () => {
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
            <h1 className="mb-4 text-4xl font-bold text-primary">Política de Privacidade</h1>
            <p className="text-xl text-muted-foreground">
              Como protegemos e utilizamos suas informações pessoais
            </p>
          </div>

          {/* Privacy Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="size-6 text-primary" />
                Política de Privacidade – GS Aprova
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none space-y-6">
              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">1. Dados que coletamos</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Coletamos dados pessoais como nome, e-mail e preferências de estudo quando você se
                  cadastra ou preenche formulários em nossa plataforma.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  2. Como usamos seus dados
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Para personalizar sua experiência de estudos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Para comunicar sobre aulas, serviços e promoções</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Para melhorar nossa plataforma e serviços</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Para processar pagamentos e enviar materiais contratados</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  3. Compartilhamento de dados
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Não vendemos seus dados para terceiros. As informações podem ser compartilhadas
                  apenas com prestadores de serviços que apoiam nossas operações, sob acordos de
                  confidencialidade.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">4. Segurança dos dados</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Adotamos medidas técnicas e organizacionais para proteger suas informações
                  pessoais contra acesso não autorizado, perda ou destruição. Contudo, nenhum
                  sistema é completamente seguro.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  5. Direitos dos usuários
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento
                  entrando em contato com nossa equipe de suporte.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  6. Atualizações desta política
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Esta política pode ser atualizada periodicamente. Recomendamos verificar esta
                  página regularmente para se manter informado sobre como protegemos seus dados.
                </p>
              </section>

              <div className="mt-8 rounded-lg bg-accent/20 p-6">
                <h4 className="mb-3 text-lg font-semibold text-primary">Seus Direitos (LGPD)</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Confirmar a existência de tratamento de dados</li>
                  <li>• Acessar seus dados pessoais</li>
                  <li>• Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>• Solicitar a exclusão de dados pessoais</li>
                  <li>• Revogar o consentimento</li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  <strong>Para exercer seus direitos:</strong> Entre em contato via WhatsApp (11)
                  97496-9036
                </p>
              </div>

              <div className="mt-6 rounded-lg bg-primary/10 p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Última atualização:</strong> Janeiro de 2025
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
              Tem dúvidas sobre privacidade? Fale conosco
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
