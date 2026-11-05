export const FinalCTA = () => {
  const handleCTAClick = () => {
    const message = encodeURIComponent(
      'Oi, não quero perder tempo! Quero começar hoje mesmo. Vim pelo site GS Aprova.'
    );
    window.open(`https://wa.me/5511985363890?text=${message}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-accent py-16 lg:py-20">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-accent-hover blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-primary lg:text-5xl">
            As provas estão chegando.
            <br />
            <span className="text-primary-navy">Não perca tempo com excesso de conteúdo.</span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl font-light leading-relaxed text-primary">
            Foque no que garante pontos. Comece hoje mesmo sua preparação direcionada.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleCTAClick}
              className="rounded-xl border-2 border-primary bg-primary px-12 py-6 text-xl font-bold text-white shadow-card transition-all duration-300 hover:scale-105 hover:bg-primary-hover hover:shadow-card-hover"
            >
              Começar hoje mesmo
            </button>

            <p className="text-sm font-medium text-primary-navy">
              ⚡ Contato rápido e objetivo • 💯 Metodologia comprovada • 🎯 Foco no que importa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
