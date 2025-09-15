import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

export default function PoliticaDePrivacidade() {
  useEffect(() => {
    document.title = "Política de Privacidade (LGPD) | GS Aprova";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Política de Privacidade (LGPD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Esta Política descreve como coletamos, usamos e protegemos seus dados 
              pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>

            <h2 className="font-semibold text-lg">1. Controlador</h2>
            <p>
              GS Aprova — contato:{" "}
              <a href="mailto:contato@gsaprovamr.com.br" className="underline">
                contato@gsaprovamr.com.br
              </a>
              .
            </p>

            <h2 className="font-semibold text-lg">2. Dados Coletados</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identificação: nome.</li>
              <li>Contato: e-mail, telefone/WhatsApp.</li>
              <li>Dados de navegação (cookies, páginas acessadas).</li>
            </ul>

            <h2 className="font-semibold text-lg">3. Finalidades</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Atendimento a mensagens e dúvidas.</li>
              <li>Envio de conteúdos e materiais educacionais.</li>
              <li>Mensuração de performance do site e melhoria de serviços.</li>
            </ul>

            <h2 className="font-semibold text-lg">4. Bases Legais</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Execução de contrato ou procedimentos preliminares.</li>
              <li>Legítimo interesse para melhoria do serviço.</li>
              <li>Consentimento para comunicações de marketing.</li>
            </ul>

            <h2 className="font-semibold text-lg">5. Direitos do Titular</h2>
            <p>
              Você pode solicitar acesso, correção, anonimização, portabilidade ou exclusão, 
              além de revogar consentimentos. Contato:{" "}
              <a href="mailto:contato@gsaprovamr.com.br" className="underline">
                contato@gsaprovamr.com.br
              </a>.
            </p>

            <h2 className="font-semibold text-lg">6. Compartilhamento</h2>
            <p>
              Usamos provedores de infraestrutura e comunicação. Compartilhamos apenas o necessário.
            </p>

            <h2 className="font-semibold text-lg">7. Segurança e Retenção</h2>
            <p>
              Adotamos medidas de segurança razoáveis. Retemos dados pelo tempo necessário 
              às finalidades ou conforme exigências legais.
            </p>

            <h2 className="font-semibold text-lg">8. Cookies</h2>
            <p>
              Utilizamos cookies para funcionalidade e métricas. Você pode ajustar preferências 
              no navegador.
            </p>

            <p className="text-sm text-gray-500">Atualizado em: 15/09/2025</p>

            <p className="mt-6 text-sm">
              Veja também os{" "}
              <Link to="/termos" className="underline">Termos de Uso</Link>.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
