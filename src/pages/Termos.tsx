import React from "react";

export default function Termos() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

      <p className="text-sm text-gray-500 mb-8">Última atualização: 15/09/2025</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Aceite</h2>
        <p>
          Ao usar o site, enviar redações ou contratar serviços, você declara que leu, entendeu e aceita estes
          Termos e a <a href="/privacidade" className="underline">Política de Privacidade</a>. Se não concordar,
          não utilize a plataforma.
        </p>

        <h2 className="text-xl font-semibold">2. Serviços</h2>
        <p>
          Prestamos serviços educacionais, especialmente correção de redações e orientação de estudos, conforme
          descrito no site e/ou proposta comercial. O escopo, preços e prazos podem ser atualizados a qualquer
          momento, com efeitos não retroativos.
        </p>

        <h2 className="text-xl font-semibold">3. Cadastro e comunicação</h2>
        <p>
          Para contratar, podemos solicitar <strong>nome, e-mail e WhatsApp</strong>. Você se compromete a
          fornecer dados exatos e manter contato disponível para a entrega. Mensagens pelo WhatsApp seguem
          também os termos da própria plataforma do WhatsApp.
        </p>

        <h2 className="text-xl font-semibold">4. Entrega e SLA</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>A contagem do prazo de <strong>até 48h úteis</strong> inicia após a <strong>confirmação de pagamento</strong> e recebimento correto do material.</li>
          <li>“Horas úteis” consideram dias úteis locais, excluindo fins de semana e feriados.</li>
          <li>Em casos de volume atípico ou força maior, avisaremos por e-mail/WhatsApp.</li>
        </ul>

        <h2 className="text-xl font-semibold">5. Conteúdo do usuário (redações)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Você declara autoria do texto enviado e que não viola direitos de terceiros.</li>
          <li>
            Concede à plataforma licença não exclusiva para usar seu texto apenas para (i) correção e feedback,
            (ii) treinamento interno de equipe e (iii) geração de estatísticas internas anonimizadas.
          </li>
          <li>Publicação externa do seu texto só ocorrerá com seu consentimento prévio e expresso.</li>
        </ul>

        <h2 className="text-xl font-semibold">6. Pagamentos e reembolsos</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>O pagamento é confirmado via WhatsApp <strong>(11 97496-9036)</strong> mediante comprovante.</li>
          <li><strong>Antes</strong> da correção ser iniciada: reembolso integral, se solicitado.</li>
          <li><strong>Após</strong> a correção entregue: não há reembolso (serviço já prestado). Em erro material (arquivo incorreto), corrigiremos sem custo.</li>
        </ul>

        <h2 className="text-xl font-semibold">7. Uso aceitável</h2>
        <p>
          É proibido: burlar medidas de segurança, tentar acesso não autorizado, violar propriedade intelectual,
          enviar conteúdo ilícito, malicioso, discriminatório ou difamatório.
        </p>

        <h2 className="text-xl font-semibold">8. Propriedade intelectual</h2>
        <p>
          Todo o conteúdo da plataforma (marca, layout, textos próprios, guias, rubricas de correção) pertence a{" "}
          <strong>GUSTAVO SOUZA ALVES – CNPJ 55.454.341/0001-29</strong>. Não é permitida a reprodução/redistribuição sem autorização.
        </p>

        <h2 className="text-xl font-semibold">9. Responsabilidades</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Comprometemo-nos com diligência técnica e prazos, sem garantir aprovação em exames.</li>
          <li>Não respondemos por indisponibilidades de terceiros, força maior ou erros decorrentes de informações incompletas do usuário.</li>
        </ul>

        <h2 className="text-xl font-semibold">10. Menores de idade</h2>
        <p>
          Se você for menor de 18 anos, declara possuir consentimento do responsável legal. Podemos exigir comprovação a qualquer tempo.
        </p>

        <h2 className="text-xl font-semibold">11. Alterações</h2>
        <p>
          Podemos atualizar estes Termos; a versão vigente é a publicada no site com data de atualização.
        </p>

        <h2 className="text-xl font-semibold">12. Contato e foro</h2>
        <p>
          Dúvidas e solicitações: <a href="mailto:gsaprova@gsmatematicanegocios.com.br" className="underline">gsaprova@gsmatematicanegocios.com.br</a> ou{" "}
          <a href="https://wa.me/5511974969036" className="underline" target="_blank" rel="noreferrer">(11) 97496-9036</a>.<br />
          Aplica-se a legislação brasileira. <strong>Foro da Comarca de São Paulo/SP</strong>, com renúncia a qualquer outro.
        </p>
      </section>
    </main>
  );
          }
