import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Users, Award } from "lucide-react";

const About = () => {
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
              Sobre o GS Aprova
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa história e missão em transformar vidas através da educação
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  GS Aprova is an educational platform created to help students succeed in ENEM, FUVEST and other Brazilian exams. 
                  Our mission is to make quality education more accessible through personalized content, online support, and interactive study plans.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  We believe education transforms lives, and we work every day to prepare students with strategy, practice, and confidence.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    Nossa Abordagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Conteúdo personalizado para cada estudante</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Suporte online especializado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Planos de estudo interativos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Correção detalhada de redações</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    Nossos Valores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Educação de qualidade para todos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Compromisso com o sucesso do aluno</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Transparência e ética</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Inovação constante</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-muted-foreground mb-6">
              Junte-se aos milhares de estudantes que já transformaram seus resultados com o GS Aprova
            </p>
            <Button 
              onClick={() => window.location.href = '/contato'}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            >
              Fale conosco
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;