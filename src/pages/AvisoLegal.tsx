export default function AvisoLegal() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Aviso Legal | GS Aprova</title>
        <meta name="description" content="Aviso legal e limitações do GS Aprova." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Aviso Legal</h1>

      <p className="mb-4">
        Os materiais e informações têm finalidade educacional. Não constituem
        garantia de aprovação e podem conter erros. Utilize com senso crítico.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Isenção de Responsabilidade</h2>
      <p className="mb-4">
        Na extensão permitida pela lei aplicável, não nos responsabilizamos por
        decisões tomadas com base nos conteúdos aqui disponibilizados.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contato</h2>
      <p className="mb-4">
        Para dúvidas legais:{" "}
        <a href="mailto:contato@gsaprovamr.com.br" className="underline">
          contato@gsaprovamr.com.br
        </a>.
      </p>

      <p className="text-sm text-gray-500 mt-8">Atualizado em: 15/09/2025</p>
    </main>
  );
}
