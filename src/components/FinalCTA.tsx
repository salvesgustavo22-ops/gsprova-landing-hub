export const FinalCTA = () => {
  const handleCTAClick = () => {
    const message = encodeURIComponent(
      'Oi, não quero perder tempo! Quero começar hoje mesmo. Vim pelo site GS Aprova.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 py-16 lg:py-20">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-yellow-500/10"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
            As provas estão chegando.
            <br />
            <span className="text-gray-800">Não perca tempo com excesso de conteúdo.</span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl font-light leading-relaxed text-gray-800">
            Foque no que garante pontos. Comece hoje mesmo sua preparação direcionada.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleCTAClick}
              className="font-montserrat rounded-xl border-2 border-gray-900 bg-gray-900 px-12 py-6 text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-yellow-600 hover:bg-gray-800"
            >
              Começar hoje mesmo
            </button>

            <p className="text-sm font-light text-gray-700">
              ⚡ Contato rápido e objetivo • 💯 Metodologia comprovada • 🎯 Foco no que importa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
