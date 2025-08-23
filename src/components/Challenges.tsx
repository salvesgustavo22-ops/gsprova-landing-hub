import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Target, Zap, CheckCircle } from "lucide-react";

interface Challenge {
  icon: React.ReactNode;
  problem: string;
  solution: string;
}

const challenges: Challenge[] = [
  {
    icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
    problem: "Matemática parece impossível",
    solution: "Explicamos de forma simples e prática, focando no que realmente cai no ENEM"
  },
  {
    icon: <Target className="w-6 h-6 text-accent" />,
    problem: "Redação com nota baixa",
    solution: "Correção detalhada com feedback específico para subir sua nota para 900+"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    problem: "Pouco tempo para estudar",
    solution: "Método objetivo focado apenas no que você precisa para passar"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-success" />,
    problem: "Falta de acompanhamento",
    solution: "Suporte contínuo via WhatsApp e planos personalizados para seu perfil"
  }
];

export const Challenges = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Seus Desafios, Nossa <span className="text-primary">Solução</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sabemos exatamente onde você está travando na sua preparação. Aqui está como vamos resolver juntos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="card-service hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-muted rounded-lg">
                    {challenge.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {challenge.problem}
                    </h3>
                    <p className="text-muted-foreground">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};