import { Link } from "react-router-dom";

export default function PoliticaDePrivacidade() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Política de Privacidade (LGPD) | GS Aprova</title>
        <meta
          name="description"
          content="Política de Privacidade do GS Aprova conforme LGPD."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Política de Privacidade (LGPD)</h1>

      <p className="mb-4">
        Esta Política descreve como coletamos, usamos e protegemos seus dados
        pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei
        nº 13.709/2018).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Controlador</h2>
      <p className="mb-4">
        GS Aprova — e-mail de contato do DPO/encarregado:{" "}
        <a href="mailto:contato@gsaprovamr.com.br" className="underline">
          contato@gsaprovamr.com.br
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Dados Coletados</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Identificação: nome.</li>
        <li>Contato: e-mail, telefone/WhatsApp.</li>
        <li>Dados de navegação (cookies, páginas acessadas) para métricas.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Finalidades</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Responder mensagens e prestar atendimento.</li>
        <li>Enviar conteúdos, ofertas e materiais educacionais.</li>
        <li>Mensurar performance do site e melhorar serviços.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Bases Legais</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Execução de contrato ou procedimentos preliminares (art. 7º, V).</li>
        <li>Legítimo interesse (art. 7º, IX) — melhoria e segurança do serviço.</li>
        <li>Consentimento (art. 7º, I) — comunicações de marketing.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Direitos do Titular</h2>
      <p className="mb-4">
        Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade
        e exclusão, além de revogar consentimentos. Contato:{" "}
        <a href="mailto:contato@gsaprovamr.com.br" className="underline">
          contato@gsaprovamr.com.br
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Compartilhamento</h2>
      <p className="mb-4">
        Poderemos usar provedores de infraestrutura e e-mail/WhatsApp para operação
        (ex.: plataformas de hospedagem, CRM). Compartilhamos apenas o necessário.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Segurança e Retenção</h2>
      <p className="mb-4">
        Aplicamos medidas razoáveis de segurança. Mantemos os dados pelo tempo
        necessário às finalidades e conforme obrigações legais.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Cookies</h2>
      <p className="mb-4">
        Utilizamos cookies para funcionalidade e métricas. Você pode ajustar
        preferências no navegador.
      </p>

      <p className="text-sm text-gray-500 mt-8">Atualizado em: 15/09/2025</p>

      <p className="mt-8 text-sm">
        Veja também os <Link to="/termos" className="underline">Termos de Uso</Link>.
      </p>
    </main>
  );
}
