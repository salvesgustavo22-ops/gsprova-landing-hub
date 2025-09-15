// src/pages/Privacidade.tsx
import React from "react";
import LegalLayout from "../components/legal/LegalLayout";
import CookieBanner from "../components/legal/CookieBanner";
import ConsentCheckboxes from "../components/legal/ConsentCheckboxes";
import DataRequestForm from "../components/legal/DataRequestForm";
import { CONTACT_EMAIL, WHATSAPP_LINK, ORG_LEGAL_NAME, ORG_CNPJ, LAST_UPDATED } from "../lib/legal";

export default function Privacidade() {
  return (
    <LegalLayout title="Política de Privacidade (LGPD)" lastUpdated={LAST_UPDATED}>
      <CookieBanner />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Controlador e Encarregado (DPO)</h2>
        <p>
          Controlador: <strong>{ORG_LEGAL_NAME} – CNPJ {ORG_CNPJ}</strong>.<br />
          Encarregado (DPO): <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 className="text-xl font-semibold">2. Quais dados coletamos</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Identificação/contato:</strong> nome, e-mail e WhatsApp (dos formulários do site).</li>
          <li><strong>Conteúdo enviado:</strong> redações e anexos para correção.</li>
          <li><strong>Comprovação de pagamento:</strong> apenas o necessário para validar o pagamento; não armazenamos dados sensíveis de cartão/banco.</li>
          <li><strong>Técnicos/analytics:</strong> IP, dispositivo, páginas e horários (cookies e tecnologias similares).</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Bases legais (LGPD)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Execução de contrato</strong> (art. 7º, V): prestação dos serviços contratados.</li>
          <li><strong>Consentimento</strong> (art. 7º, I): marketing e eventual publicação de redações.</li>
          <li><strong>Legítimo interesse</strong> (art. 7º, IX): segurança, antifraude, usabilidade e métricas internas.</li>
          <li><strong>Obrigação legal</strong> (art. 7º, II): registros contábeis e fiscais.</li>
        </ul>

        <h2 className="text-xl font-semibold">4. Finalidades</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Prestar e aperfeiçoar os serviços (correção, feedback, suporte).</li>
          <li>Comunicação operacional sobre prazos, pendências e entrega (e-mail/WhatsApp).</li>
          <li>Cumprimento de obrigações legais/fiscais.</li>
          <li>Métricas agregadas e segurança (logs, auditoria e antifraude).</li>
          <li>Marketing (se consentido), com opt-out facilitado.</li>
        </ul>

        <h2 className="text-xl font-semibold">5. Compartilhamento</h2>
        <p>
          Compartilhamos dados com provedores (hospedagem, e-mail, analytics, atendimento) e autoridades quando exigido por lei/ordem. 
          <strong> Não vendemos</strong> dados pessoais.
        </p>

        <h2 className="text-xl font-semibold">6. Retenção</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Dados de serviço: durante a relação e por até 5 anos após o término.</li>
          <li>Logs técnicos: prazos compatíveis com segurança/auditoria.</li>
          <li>Dados por consentimento: até revogação ou atendimento da finalidade.</li>
        </ul>

        <h2 className="text-xl font-semibold">7. Segurança</h2>
        <p>
          Adotamos medidas técnicas e administrativas para proteger contra acesso não autorizado, perda, alteração ou divulgação indevida.
          Incidentes relevantes serão notificados conforme LGPD.
        </p>

        <h2 className="text-xl font-semibold">8. Direitos do titular (art. 18, LGPD)</h2>
        <p>
          Você pode solicitar acesso, correção, anonimização, bloqueio/eliminação, portabilidade, informação de compartilhamentos, 
          revogação de consentimento e revisão de decisões automatizadas (se houver). 
          Canais: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> |{" "}
          <a className="underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>. 
          Prazo-alvo: até 48h úteis.
        </p>

        <h2 className="text-xl font-semibold">9. Cookies e preferências</h2>
        <p>
          Usamos cookies necessários (funcionamento), analytics (medição) e marketing (opcional). 
          Gerencie suas preferências abaixo:
        </p>
        <ConsentCheckboxes />

        <h2 className="text-xl font-semibold">10. Menores de idade</h2>
        <p>
          Serviços mediante contratação por responsável legal ou consentimento expresso do responsável. Sujeito à comprovação.
        </p>

        <h2 className="text-xl font-semibold">11. Transferências internacionais</h2>
        <p>
          Se houver provedores fora do Brasil, aplicamos salvaguardas adequadas (cláusulas contratuais, padrões de segurança e conformidade).
        </p>

        <h2 className="text-xl font-semibold">12. Exercício de direitos (formulário rápido)</h2>
        <DataRequestForm />

        <h2 className="text-xl font-semibold">13. Atualizações</h2>
        <p>Esta Política pode ser alterada; manteremos a versão vigente com data de atualização.</p>

        <h2 className="text-xl font-semibold">14. Contato do DPO</h2>
        <p>
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> |{" "}
          <a className="underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>
        </p>
      </section>
    </LegalLayout>
  );
            }
