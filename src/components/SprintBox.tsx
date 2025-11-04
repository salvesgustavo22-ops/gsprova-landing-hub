import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Check } from 'lucide-react';

export const SprintBox = () => {
  const handleCtaClick = () => {
    window.open('https://hotm.art/ms5Coa', '_blank');
  };

  return (
    <Card className="border-2 border-[#FBBF24] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[#FBBF24] p-4">
              <BookOpen className="size-12 text-[#1E3A8A]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            Sprint Redação 900+ 🚀
          </CardTitle>
          <p className="mt-2 text-lg text-white/90">
            Guia de estudos com 8 módulos para construir a redação nota 900 no ENEM
          </p>
          <div className="mt-4 text-center">
            <div className="mb-1 text-sm text-white/70 line-through">De R$ 35,90</div>
            <div className="text-4xl font-bold text-[#FBBF24]">R$ 17,90</div>
            <div className="mt-1 text-sm font-semibold text-white">🔥 Super Promoção!</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">O que você vai aprender:</h3>
            <ul className="space-y-2">
              {[
                'Entenda definitivamente do que dependerá sua nota',
                'Construção de cada elemento dissertativo (introdução, argumentação, proposta)',
                'Instrumentos de coesão textual',
                'Apostas de temas e sugestões de repertório',
                'Exercícios práticos',
                'Mindfulness e técnicas de concentração',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white">
                  <Check className="mt-1 size-5 shrink-0 text-[#FBBF24]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={handleCtaClick}
            className="w-full bg-[#FBBF24] py-6 text-lg font-bold text-[#1E3A8A] hover:brightness-95"
            size="lg"
          >
            Quero Garantir Meu Guia
          </Button>

          <div className="rounded-lg bg-white/10 p-3 text-center text-sm text-white">
            💳 Pagamento via PIX ou Cartão | 📧 Nota Fiscal | 🎧 Suporte 7 dias
          </div>
        </CardContent>
      </Card>
  );
};
