import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Clock, MessageCircle, Users, PlayCircle, Send, Star } from 'lucide-react';
import mockup from '@/assets/plantao-enem-2026-mockup.jpg';
import { PLANTAO_CHECKOUT_URL, PLANTAO_WHATSAPP_URL } from '@/lib/constants';

const COPYRIGHT = 'Material GS APROVA® · Proibido reproduzir sem a autorização do Autor GS Aprova 2026';

const CtaButton = ({ children }: { children: React.ReactNode }) => (
  <a
    href={PLANTAO_CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block rounded-xl bg-plantao-gold px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-plantao-bg shadow-[0_0_30px_hsl(var(--plantao-gold)/0.45)] transition-transform hover:scale-[1.02] md:text-lg"
  >
    {children}
  </a>
);

const Block = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`px-4 py-14 md:py-20 ${className}`}>
    <div className="mx-auto max-w-5xl">{children}</div>
    <p className="mx-auto mt-10 max-w-5xl text-center text-[10px] text-plantao-text/40">{COPYRIGHT}</p>
  </section>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-8 text-center text-2xl font-extrabold text-plantao-text md:text-4xl">{children}</h2>
);

const dores = [
  'Já são 21h e você travou na introdução.',
  'Você tem repertório decorado e não sabe encaixar.',
  'Você escreveu 3 redações essa semana e ninguém corrigiu nenhuma.',
];
const praVoce = [
  'Vai fazer o ENEM no domingo e quer garantir pontos na redação',
  'Trava na hora de começar e perde tempo na introdução',
  'Já sabe o conteúdo, mas não sabe a estrutura que o corretor espera',
  'Quer alguém apontando o erro antes da prova, não depois',
];
const naoPraVoce = [
  'Quer um curso completo de meses (esse é o pacote ENEM 2027)',
  'Não vai fazer a prova agora',
];
const entregaveis = [
  ['Plantão ao vivo de 40 min (estrutura + repertório coringa + erros que zeram)', 'R$ 120,00'],
  ['PDF com 10 repertórios coringa e 3 modelos de introdução', 'R$ 47,00'],
  ['1 correção da sua redação com nota estimada e devolutiva em 12h', 'R$ 30,00'],
];
const passos = [
  { icon: Users, t: 'Compra e entra no grupo VIP' },
  { icon: PlayCircle, t: 'Assiste ao plantão às 20h (ou acessa a gravação na área de membros)' },
  { icon: Send, t: 'Envia a redação até 10h de sexta e recebe a correção expressa até 22h' },
];
// Depoimentos provisórios — substituir pelos prints reais de TikTok/WhatsApp
const depoimentos = [
  { origem: 'WhatsApp', nome: 'Aluna 3º ano', texto: 'A correção chegou rapidinho e eu entendi finalmente onde perdia ponto na C5!' },
  { origem: 'TikTok', nome: '@vestibulanda', texto: 'Esse repertório coringa salvou minha introdução 🙏' },
  { origem: 'WhatsApp', nome: 'Aluno ENEM', texto: 'Estrutura simples e direta. Fiz a redação em metade do tempo.' },
];

const PlantaoEnem2026 = () => {
  useEffect(() => {
    document.title = 'Plantão de Véspera ENEM 2026 · Redação com Correção em 12h | GS Aprova';
    const desc = 'Plantão ao vivo de 40 min, 10 repertórios coringa e sua redação corrigida em 12h antes do ENEM 2026. De R$197 por R$97.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, []);

  return (
    <div className="min-h-screen bg-plantao-bg text-plantao-text">
      {/* B1 */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-plantao-gold px-3 py-2 text-center text-xs font-bold text-plantao-bg md:text-sm">
        <Clock className="h-4 w-4 shrink-0" />
        Redação do ENEM em 3 dias · Plantão hoje às 20h · 10 correções expressas restantes
      </div>

      <header className="px-4 pt-4">
        <Link to="/" className="text-sm font-bold tracking-widest text-plantao-gold">GS APROVA</Link>
      </header>

      {/* B2 */}
      <Block className="relative overflow-hidden">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight md:text-4xl">
              Faltam 3 dias para a redação do ENEM. Em <span className="text-plantao-gold">40 minutos</span> você recebe a estrutura, os repertórios e a sua redação corrigida antes de domingo.
            </h1>
            <p className="mt-5 text-lg text-plantao-text/80">
              Sem aula de 4 horas e sem enrolação. Só o que cai, com alguém olhando o seu texto antes da prova.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <CtaButton>Quero entrar no plantão — R$ 97,00</CtaButton>
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
      </Block>

      {/* B3 */}
      <Block className="bg-plantao-surface">
        <H2>Você se reconhece?</H2>
        <div className="grid gap-4 md:grid-cols-3">
          {dores.map(d => (
            <div key={d} className="rounded-xl border border-plantao-gold/30 bg-plantao-bg p-6 text-lg font-semibold">{d}</div>
          ))}
        </div>
      </Block>

      {/* B4 + B5 */}
      <Block>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-plantao-gold/40 p-6">
            <h2 className="mb-5 text-2xl font-extrabold text-plantao-gold">É pra você se...</h2>
            <ul className="space-y-3">
              {praVoce.map(i => (
                <li key={i} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-plantao-gold" />{i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-plantao-text/20 p-6">
            <h2 className="mb-5 text-2xl font-extrabold">Não é pra você se...</h2>
            <ul className="space-y-3">
              {naoPraVoce.map(i => (
                <li key={i} className="flex gap-3 text-plantao-text/80"><X className="mt-1 h-5 w-5 shrink-0 text-destructive" />{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* B6 */}
      <Block className="bg-plantao-surface">
        <H2>O que você recebe</H2>
        <div className="overflow-hidden rounded-2xl border border-plantao-gold/30">
          {entregaveis.map(([item, valor]) => (
            <div key={item} className="flex items-center justify-between gap-4 border-b border-plantao-gold/20 bg-plantao-bg p-5">
              <span className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-plantao-gold" />{item}</span>
              <span className="whitespace-nowrap text-plantao-text/60">Valor {valor}</span>
            </div>
          ))}
          <div className="flex items-center justify-between bg-plantao-gold/10 p-5 text-lg font-extrabold">
            <span>Valor total</span>
            <span className="text-plantao-gold">R$ 197,00</span>
          </div>
        </div>
      </Block>

      {/* B7 — texto provisório, revisar dados do professor */}
      <Block>
        <H2>Quem corrige</H2>
        <div className="mx-auto max-w-2xl rounded-2xl border border-plantao-gold/30 bg-plantao-surface p-8 text-center">
          <p className="text-lg leading-relaxed text-plantao-text/90">
            Professor GS Aprova, com mais de 10 anos preparando alunos para ENEM e vestibulares.
            Milhares de redações corrigidas com foco nas 5 competências do INEP.
            A mesma metodologia que já levou alunos à nota 900+.
          </p>
          <a
            href={PLANTAO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-plantao-gold px-5 py-3 font-bold text-plantao-gold transition-colors hover:bg-plantao-gold/10"
          >
            <MessageCircle className="h-5 w-5" /> Tirar dúvida no WhatsApp — (11) 98536-3890
          </a>
        </div>
      </Block>

      {/* B8 */}
      <Block className="bg-plantao-surface">
        <H2>Como funciona</H2>
        <div className="grid gap-6 md:grid-cols-3">
          {passos.map(({ icon: Icon, t }, i) => (
            <div key={t} className="rounded-2xl bg-plantao-bg p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plantao-gold text-xl font-extrabold text-plantao-bg">{i + 1}</div>
              <Icon className="mx-auto mb-3 h-6 w-6 text-plantao-gold" />
              <p className="font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* B9 */}
      <Block>
        <H2>O que os alunos dizem</H2>
        <div className="grid gap-4 md:grid-cols-3">
          {depoimentos.map(d => (
            <div key={d.texto} className="rounded-2xl border border-plantao-gold/20 bg-plantao-surface p-6">
              <div className="mb-3 flex gap-1 text-plantao-gold">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mb-4">"{d.texto}"</p>
              <p className="text-sm text-plantao-text/60">{d.nome} · via {d.origem}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* B10 */}
      <Block className="bg-plantao-surface">
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-plantao-gold bg-plantao-bg p-8 text-center">
          <p className="text-lg text-plantao-text/70">De <span className="line-through">R$ 197,00</span> por apenas</p>
          <p className="my-2 text-5xl font-extrabold text-plantao-gold">R$ 97,00</p>
          <p className="mb-6 text-plantao-text/80">ou 3x de R$ 35,00</p>
          <p className="mb-6 rounded-lg bg-destructive/20 px-4 py-2 font-bold">
            ⏳ Últimas vagas para as 10 correções expressas em 12h!
          </p>
          <CtaButton>Quero entrar no plantão agora</CtaButton>
          <p className="mt-4 text-sm text-plantao-text/60">Pix, cartão ou boleto · Acesso imediato · Garantia de 7 dias</p>
        </div>
      </Block>
    </div>
  );
};

export default PlantaoEnem2026;
