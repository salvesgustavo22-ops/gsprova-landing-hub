import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import logo from '@/assets/novo-logo-gsaprova-novembro-2-fundo-transparente.png';

const LINK_CLASS =
  'text-sm font-medium text-nav-foreground transition-colors hover:text-accent-soft';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  // The golden announcement bar sticks above the menu on every page except the Plantão landing.
  const hasAnnouncementBar = pathname !== '/plantao-enem-2026';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string) => {
    trackEvent('nav_click', { label });
  };

  return (
    <nav
      aria-label="Menu principal"
      className={`sticky z-50 border-b border-accent/20 bg-nav/95 backdrop-blur-md transition-all duration-200 ${
        hasAnnouncementBar ? 'top-9' : 'top-0'
      } ${isScrolled ? 'shadow-lg shadow-black/40' : ''}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="mr-8 flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <img
              src={logo}
              alt="GS Aprova - Preparação para ENEM e Vestibulares"
              className="h-12 w-auto object-contain"
              width="64"
              height="48"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className={LINK_CLASS}
              onClick={() => handleNavClick('Início')}
              aria-label="Ir para página inicial"
            >
              Início
            </Link>
            <Link
              to="/planos"
              className={LINK_CLASS}
              onClick={() => handleNavClick('Planos')}
              aria-label="Ir para Planos"
            >
              Planos
            </Link>
            <Link
              to="/blog"
              className={LINK_CLASS}
              onClick={() => handleNavClick('Blog')}
              aria-label="Ir para Blog"
            >
              Blog
            </Link>
            <Link
              to="/contato"
              className={LINK_CLASS}
              onClick={() => handleNavClick('Contato')}
              aria-label="Ir para Contato"
            >
              Contato
            </Link>
            <Link
              to="/plantao-enem-2026"
              className="text-sm font-bold text-accent-soft underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
              onClick={() => handleNavClick('Plantão ENEM 2026')}
            >
              Plantão ENEM 2026
            </Link>
            <Link
              to="/auth-aluno"
              className={LINK_CLASS}
              onClick={() => handleNavClick('Portal do Aluno')}
              aria-label="Ir para Portal do Aluno"
            >
              Portal do Aluno
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-nav-foreground transition-colors hover:text-accent-soft"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 border-t border-accent/20 bg-nav pb-4 md:hidden">
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                to="/"
                className={`py-2 ${LINK_CLASS}`}
                onClick={() => {
                  handleNavClick('Início');
                  setIsOpen(false);
                }}
              >
                Início
              </Link>
              <Link
                to="/planos"
                className={`py-2 ${LINK_CLASS}`}
                onClick={() => {
                  handleNavClick('Planos');
                  setIsOpen(false);
                }}
              >
                Planos
              </Link>
              <Link
                to="/blog"
                className={`py-2 ${LINK_CLASS}`}
                onClick={() => {
                  handleNavClick('Blog');
                  setIsOpen(false);
                }}
              >
                Blog
              </Link>
              <Link
                to="/contato"
                className={`py-2 ${LINK_CLASS}`}
                onClick={() => {
                  handleNavClick('Contato');
                  setIsOpen(false);
                }}
              >
                Contato
              </Link>
              <Link
                to="/plantao-enem-2026"
                className="py-2 text-sm font-bold text-accent-soft"
                onClick={() => {
                  handleNavClick('Plantão ENEM 2026');
                  setIsOpen(false);
                }}
              >
                Plantão ENEM 2026
              </Link>
              <Link
                to="/auth-aluno"
                className={`py-2 ${LINK_CLASS}`}
                onClick={() => {
                  handleNavClick('Portal do Aluno');
                  setIsOpen(false);
                }}
              >
                Portal do Aluno
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
