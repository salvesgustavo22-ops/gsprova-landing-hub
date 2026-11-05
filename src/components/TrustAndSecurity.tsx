import { Card, CardContent } from '@/components/ui/card';

const trustFeatures = [
  {
    title: 'Pagamentos Seguros',
    description: 'SSL 256-bits e certificação PCI DSS para máxima proteção',
  },
  {
    title: 'Dados Protegidos',
    description: 'Seus dados pessoais são criptografados e nunca compartilhados',
  },
  {
    title: 'Teste Nossos Serviços',
    description: 'Agende uma aula-pocket gratuitamente e conheça nossa metodologia',
  },
  {
    title: 'Professores Verificados',
    description: 'Todos nossos profissionais são certificados e aprovados',
  },
  {
    title: 'Contato Rápido e Objetivo',
    description: 'Atendimento rápido via WhatsApp em horário comercial',
  },
  {
    title: '+500 Aprovados',
    description: 'Centenas de estudantes já conquistaram suas vagas',
  },
];

const securityBadges = [
  {
    name: 'SSL Seguro',
    icon: '🔒',
    description: 'Conexão criptografada',
  },
  {
    name: 'Pagamento Seguro',
    icon: '💳',
    description: 'PCI DSS Certificado',
  },
  {
    name: 'LGPD Compliant',
    icon: '🛡️',
    description: 'Lei Geral de Proteção de Dados',
  },
  {
    name: 'Suporte Brasileiro',
    icon: '🇧🇷',
    description: 'Atendimento nacional',
  },
];

export const TrustAndSecurity = () => {
  return (
    <section className="bg-neutral-light py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
            Sua Segurança é Nossa Prioridade
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Estudar conosco é seguro, confiável e com garantia de qualidade
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trustFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border-none bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardContent className="p-6 text-center">
                <h3 className="mb-2 text-xl font-semibold text-primary">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Badges */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-bold text-primary">Certificações e Segurança</h3>
            <p className="text-muted-foreground">
              Seguimos os mais altos padrões de segurança da internet
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {securityBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl">{badge.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-primary">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-white">
          <h3 className="mb-4 text-2xl font-bold">Teste nossos serviços!</h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-white/90">
            Agende uma aula-pocket gratuitamente e conheça nossa metodologia de ensino
            personalizada.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent(
                'Oi, quero agendar uma aula-pocket gratuita! Vim pelo site GS Aprova.'
              );
              window.open(`https://wa.me/5511985363890?text=${message}`, '_blank');
            }}
            className="btn-hero bg-accent px-8 py-4 text-lg text-primary hover:bg-accent/90"
          >
            Quero aula-pocket gratuita
          </button>
        </div>
      </div>
    </section>
  );
};
