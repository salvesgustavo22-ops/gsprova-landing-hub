import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function TermosDeUso() {
  useEffect(() => {
    document.title = "Termos de Uso | GS Aprova";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Termos de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Ao acessar e utilizar este site, você concorda com estes Termos de Uso. 
              Se não concordar, deve interromper o uso imediatamente.
            </p>

            <h2 className="font-semibold text-lg">1. Objetivo do Serviço</h2>
            <p>
              O GS Aprova oferece conteúdos educacionais e serviços correlatos. 
              As informações não garantem aprovação e servem como suporte pedagógico.
            </p>

            <h2 className="font-semibold text-lg">2. Cadastro e Contato</h2>
            <p>
              Ao enviar dados (nome, e-mail, WhatsApp), você declara que são 
              verdadeiros e autoriza o contato para fins de atendimento e ofertas 
              relacionadas aos serviços educacionais.
            </p>

            <h2 className="font-semibold text-lg">3. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo (textos, imagens, vídeos, materiais) pertence ao GS Aprova. 
              É proibida a reprodução sem autorização por escrito.
            </p>

            <h2 className="font-semibold text-lg">4. Limitação de Responsabilidade</h2>
            <p>
              O uso do site é por sua conta e risco. Não nos responsabilizamos por 
              indisponibilidades, perdas de dados ou danos indiretos.
            </p>

            <h2 className="font-semibold text-lg">5. Alterações</h2>
            <p>
              Podemos alterar estes termos a qualquer momento, publicando a nova versão 
              nesta página, com data de atualização.
            </p>

            <p className="text-sm text-gray-500">Atualizado em: 15/09/2025</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}        O uso do site é por sua conta e risco. Não nos responsabilizamos por
        indisponibilidades, perdas de dados ou danos indiretos.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Alterações</h2>
      <p className="mb-4">
        Podemos alterar estes termos a qualquer momento, com publicação nesta
        página e data de atualização.
      </p>

      <p className="text-sm text-gray-500 mt-8">Atualizado em: 15/09/2025</p>
    </main>
  );
}
