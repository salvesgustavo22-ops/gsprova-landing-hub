/**
 * Skip to content link for accessibility
 * Provides keyboard navigation support
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-all duration-200 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      tabIndex={1}
    >
      Pular para o conteúdo principal
    </a>
  );
};
