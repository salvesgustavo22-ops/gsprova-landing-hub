import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Política de Privacidade
            </h1>
            <p className="text-xl text-muted-foreground">
              Como protegemos e utilizamos suas informações pessoais
            </p>
          </div>

          {/* Privacy Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="w-6 h-6 text-primary" />
                Política de Privacidade – GS Aprova
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-primary mb-3">1. Dados que coletamos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Coletamos dados pessoais como nome, e-mail e preferências de estudo quando você se cadastra ou preenche formulários em nossa plataforma.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-primary mb-3">2. Como usamos seus dados</h3>
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
                <h3 className="text-xl font-semibold text-primary mb-3">3. Compartilhamento de dados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos seus dados para terceiros. As informações podem ser compartilhadas apenas com prestadores de serviços que apoiam nossas operações, sob acordos de confidencialidade.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-primary mb-3">4. Segurança dos dados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adotamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda ou destruição. Contudo, nenhum sistema é completamente seguro.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-primary mb-3">5. Direitos dos usuários</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento entrando em contato com nossa equipe de suporte.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-primary mb-3">6. Atualizações desta política</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Esta política pode ser atualizada periodicamente. Recomendamos verificar esta página regularmente para se manter informado sobre como protegemos seus dados.
                </p>
              </section>

              <div className="bg-accent/20 p-6 rounded-lg mt-8">
                <h4 className="text-lg font-semibold text-primary mb-3">Seus Direitos (LGPD)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Confirmar a existência de tratamento de dados</li>
                  <li>• Acessar seus dados pessoais</li>
                  <li>• Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>• Solicitar a exclusão de dados pessoais</li>
                  <li>• Revogar o consentimento</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>Para exercer seus direitos:</strong> Entre em contato via WhatsApp (11) 97496-9036
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Última atualização:</strong> Janeiro de 2025
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => window.location.href = '/contato'}
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