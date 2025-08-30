import { Shield, Lock, Award, CheckCircle, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const trustFeatures = [
  {
    title: "Pagamentos Seguros",
    description: "SSL 256-bits e certificação PCI DSS para máxima proteção"
  },
  {
    title: "Dados Protegidos",
    description: "Seus dados pessoais são criptografados e nunca compartilhados"
  },
  {
    title: "Teste Nossos Serviços",
    description: "Agende uma aula-pocket gratuitamente e conheça nossa metodologia"
  },
  {
    title: "Professores Verificados",
    description: "Todos nossos profissionais são certificados e aprovados"
  },
  {
    title: "Contato Rápido e Objetivo",
    description: "Atendimento rápido via WhatsApp em horário comercial"
  },
  {
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

        {/* Call to Action Box */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Teste nossos serviços!
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
            Agende uma aula-pocket gratuitamente e conheça nossa metodologia de ensino personalizada.
          </p>
          <button 
            onClick={() => {
              const message = encodeURIComponent("Oi, quero agendar uma aula-pocket gratuita! Vim pelo site GS Aprova.");
              window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
            }}
            className="bg-accent hover:bg-accent/90 text-primary font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            Quero aula-pocket gratuita
          </button>
        </div>
      </div>
    </section>
  );
};