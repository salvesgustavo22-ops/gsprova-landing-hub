/**
 * Skip to content link for accessibility
 * Provides keyboard navigation support
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-primary text-primary-foreground px-4 py-2 rounded-md 
                 font-medium z-50 focus:outline-none focus:ring-2 
                 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
      tabIndex={1}
    >
      Pular para o conteúdo principal
    </a>
  );
};