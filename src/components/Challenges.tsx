import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Target, Zap, CheckCircle } from 'lucide-react';

interface Challenge {
  icon: React.ReactNode;
  problem: string;
  solution: string;
}

const challenges: Challenge[] = [
  {
    icon: <AlertTriangle className="size-6 text-destructive" />,
    problem: 'Matemática parece impossível',
    solution: 'Explicamos de forma simples e prática, focando no que realmente cai no ENEM',
  },
  {
    icon: <Target className="size-6 text-accent" />,
    problem: 'Redação com nota baixa',
    solution: 'Correção detalhada com feedback específico para subir sua nota para 900+',
  },
  {
    icon: <Zap className="size-6 text-primary" />,
    problem: 'Pouco tempo para estudar',
    solution: 'Método objetivo focado apenas no que você precisa para passar',
  },
  {
    icon: <CheckCircle className="size-6 text-success" />,
    problem: 'Falta de acompanhamento',
    solution: 'Suporte contínuo via WhatsApp e planos personalizados para seu perfil',
  },
];

export const Challenges = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Seus Desafios, Nossa <span className="text-primary">Solução</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Sabemos exatamente onde você está travando na sua preparação. Aqui está como vamos
            resolver juntos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {challenges.map((challenge, index) => (
            <Card key={index} className="card-service transition-transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 rounded-lg bg-muted p-3">{challenge.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{challenge.problem}</h3>
                    <p className="text-muted-foreground">{challenge.solution}</p>
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
