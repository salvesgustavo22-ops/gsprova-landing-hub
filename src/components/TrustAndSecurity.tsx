import { Shield, Lock, Award, CheckCircle, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const trustFeatures = [
  {
    icon: Shield,
    title: "Pagamentos Seguros",
    description: "SSL 256-bits e certificação PCI DSS para máxima proteção"
  },
  {
    icon: Lock,
    title: "Dados Protegidos",
    description: "Seus dados pessoais são criptografados e nunca compartilhados"
  },
  {
    icon: Award,
    title: "Satisfação Garantida",
    description: "7 dias para solicitar reembolso se não ficar satisfeito"
  },
  {
    icon: CheckCircle,
    title: "Professores Verificados",
    description: "Todos nossos profissionais são certificados e aprovados"
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Atendimento rápido via WhatsApp em horário comercial"
  },
  {
    icon: Users,
    title: "+500 Aprovados",
    description: "Centenas de estudantes já conquistaram suas vagas"
  }
];

const securityBadges = [
  {
    name: "SSL Seguro",
    icon: "🔒",
    description: "Conexão criptografada"
  },
  {
    name: "Pagamento Seguro",
    icon: "💳",
    description: "PCI DSS Certificado"
  },
  {
    name: "LGPD Compliant",
    icon: "🛡️",
    description: "Lei Geral de Proteção de Dados"
  },
  {
    name: "Suporte Brasileiro",
    icon: "🇧🇷",
    description: "Atendimento nacional"
  }
];

export const TrustAndSecurity = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Sua Segurança é Nossa Prioridade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estudar conosco é seguro, confiável e com garantia de qualidade
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Badges */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">
              Certificações e Segurança
            </h3>
            <p className="text-muted-foreground">
              Seguimos os mais altos padrões de segurança da internet
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-primary text-sm mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Box */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Garantia de 7 Dias
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Se você não ficar satisfeito com nossos serviços nos primeiros 7 dias, 
            devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracias.
          </p>
        </div>
      </div>
    </section>
  );
};