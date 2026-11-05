import { Link, useLocation } from 'react-router-dom';

const AnnouncementBar = () => {
  const { pathname } = useLocation();
  if (pathname === '/plantao-enem-2026') return null;

  return (
    <Link
      to="/plantao-enem-2026"
      className="sticky top-0 z-[60] block bg-plantao-gold px-4 py-2 text-center text-sm font-semibold text-plantao-bg transition-opacity hover:opacity-95"
    >
      🚨 VÉSPERA ENEM 2026: Plantão de Redação com Correção Expressa em 12h!{' '}
      <span className="whitespace-nowrap font-extrabold underline underline-offset-2">
        Garantir Minha Vaga →
      </span>
    </Link>
  );
};

export default AnnouncementBar;
