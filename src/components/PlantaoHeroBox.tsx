import mockup from '@/assets/plantao-enem-2026-mockup.jpg';
import { PLANTAO_CHECKOUT_URL } from '@/lib/constants';

export const PlantaoCtaButton = ({ children }: { children: React.ReactNode }) => (
  <a
    href={PLANTAO_CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block rounded-xl bg-plantao-gold px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-plantao-bg shadow-[0_0_30px_hsl(var(--plantao-gold)/0.45)] transition-transform hover:scale-[1.02] md:text-lg"
  >
    {children}
  </a>
);

export const PlantaoHeroBox = ({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' }) => {
  const Heading = headingLevel;
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div>
        <Heading className="text-2xl font-extrabold leading-tight text-plantao-text md:text-4xl">
          Faltam 3 dias para a redação do ENEM. Em <span className="text-plantao-gold">40 minutos</span> você recebe a estrutura, os repertórios e a sua redação corrigida antes de domingo.
        </Heading>
        <p className="mt-5 text-lg text-plantao-text/80">
          Sem aula de 4 horas e sem enrolação. Só o que cai, com alguém olhando o seu texto antes da prova.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3">
          <PlantaoCtaButton>Quero entrar no plantão — R$ 97,00</PlantaoCtaButton>
          <p className="text-sm text-plantao-text/70">Pix, cartão ou boleto · Acesso imediato · Garantia de 7 dias</p>
        </div>
      </div>
      <img
        src={mockup}
        alt="Plantão de Véspera ENEM 2026 — material GS Aprova"
        className="w-full rounded-2xl border border-plantao-gold/30 shadow-2xl"
        width={1200}
        height={1008}
      />
    </div>
  );
};
