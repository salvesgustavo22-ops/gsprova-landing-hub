import React from "react";

export default function Sobre() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Sobre o GS Aprova</h1>

      <section className="prose max-w-none">
        <h2>Quem somos</h2>
        <p>
          O GS Aprova é uma plataforma educacional focada em desempenho real em
          provas (ENEM, vestibulares e concursos). Unimos didática objetiva,
          correção técnica de redações e orientação estratégica de estudos para
          acelerar a evolução do aluno.
        </p>

        <h2>O que fazemos</h2>
        <ul>
          <li>
            <strong>Correção de redação com feedback detalhado</strong> (estrutura, argumentação,
            coesão, gramática e proposta de intervenção).
          </li>
          <li>
            <strong>Aulas e mentorias</strong> focadas nos pontos que mais derrubam a nota.
          </li>
          <li>
            <strong>Materiais e exercícios</strong> com foco em fundamentos e aplicação prática.
          </li>
        </ul>

        <h2>Como funciona a correção</h2>
        <ol>
          <li>Você envia a redação (upload) e nos contata pelo WhatsApp.</li>
          <li>
            Após <strong>confirmação de pagamento via WhatsApp (11 97496-9036)</strong>, entregamos a
            correção em <strong>até 48h úteis</strong>.
          </li>
          <li>
            O feedback é entregue no canal combinado (e-mail/WhatsApp/área do
            aluno, se aplicável).
          </li>
        </ol>

        <h2>Nossa base legal e seriedade com dados</h2>
        <p>
          Coletamos somente o necessário (nome, e-mail e WhatsApp) para executar
          os serviços contratados e comunicação. Tratamos dados conforme a{" "}
          <strong>LGPD (Lei 13.709/2018)</strong>. Detalhes em{" "}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>

        <h2>Titularidade e contato</h2>
        <p>
          Plataforma de titularidade de <strong>GUSTAVO SOUZA ALVES – CNPJ 55.454.341/0001-29</strong>.
          <br />
          Dúvidas: <a href="mailto:gsaprova@gsmatematicanegocios.com.br">gsaprova@gsmatematicanegocios.com.br</a>{" "}
          | WhatsApp: <a href="https://wa.me/5511974969036" target="_blank" rel="noreferrer">(11) 97496-9036</a>.
        </p>

        <p><em>Última atualização: 15/09/2025.</em></p>
      </section>
    </main>
  );
}
