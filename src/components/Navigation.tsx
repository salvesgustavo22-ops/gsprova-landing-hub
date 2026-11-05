import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { BUSINESS_WHATSAPP_URL, WHATSAPP_MESSAGES } from '@/lib/constants';
import logo from '@/assets/novo-logo-gsaprova-novembro-2.jpg';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all duration-200 dark:border-[#FBBF24]/20 dark:bg-[#0F172A]/90 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="mr-8 flex shrink-0 items-center transition-opacity hover:opacity-80">
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
              className="text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
              onClick={() => handleNavClick('Início')}
              aria-label="Ir para página inicial"
            >
              Início
            </Link>
            <Link
              to="/planos"
              className="text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
              onClick={() => handleNavClick('Planos')}
              aria-label="Ir para Planos"
            >
              Planos
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
              onClick={() => handleNavClick('Blog')}
              aria-label="Ir para Blog"
            >
              Blog
            </Link>
            <Link
              to="/contato"
              className="text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
              onClick={() => handleNavClick('Contato')}
              aria-label="Ir para Contato"
            >
              Contato
            </Link>
            <Link
              to="/plantao-enem-2026"
              className="text-sm font-medium text-accent-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-[#3B82F6] dark:text-[#FBBF24]"
              onClick={() => handleNavClick('Plantão ENEM 2026')}
            >
              Plantão ENEM 2026
            </Link>
            <Link
              to="/auth-aluno"
              className="text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
              onClick={() => handleNavClick('Portal do Aluno')}
              aria-label="Ir para Portal do Aluno"
            >
              Portal do Aluno
            </Link>

          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="size-8 text-[#1E3A8A] dark:text-white"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 border-t border-gray-200 bg-white pb-4 backdrop-blur dark:border-[#FBBF24]/20 dark:bg-[#0F172A] md:hidden">
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                to="/"
                className="py-2 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
                onClick={() => {
                  handleNavClick('Início');
                  setIsOpen(false);
                }}
              >
                Início
              </Link>
              <Link
                to="/planos"
                className="py-2 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
                onClick={() => {
                  handleNavClick('Planos');
                  setIsOpen(false);
                }}
              >
                Planos
              </Link>
              <Link
                to="/blog"
                className="py-2 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
                onClick={() => {
                  handleNavClick('Blog');
                  setIsOpen(false);
                }}
              >
                Blog
              </Link>
              <Link
                to="/contato"
                className="py-2 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
                onClick={() => {
                  handleNavClick('Contato');
                  setIsOpen(false);
                }}
              >
                Contato
              </Link>
              <Link
                to="/plantao-enem-2026"
                className="py-2 text-sm font-bold text-accent"
                onClick={() => {
                  handleNavClick('Plantão ENEM 2026');
                  setIsOpen(false);
                }}
              >
                Plantão ENEM 2026
              </Link>
              <Link
                to="/auth-aluno"
                className="py-2 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#3B82F6] dark:text-white dark:hover:text-[#FBBF24]"
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
