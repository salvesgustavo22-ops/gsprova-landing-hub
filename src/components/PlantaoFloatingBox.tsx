import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const PlantaoFloatingBox = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/plantao-enem-2026' || closed || !visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-md rounded-xl border border-plantao-gold bg-plantao-bg p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:left-auto sm:right-6 sm:mx-0">
      <button
        onClick={() => setClosed(true)}
        aria-label="Fechar"
        className="absolute right-2 top-2 text-plantao-gold/70 hover:text-plantao-gold"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="pr-6 text-xs font-bold uppercase tracking-wide text-plantao-gold">
        🚨 Plantão de Redação ENEM 2026
      </p>
      <p className="mt-1 text-sm text-plantao-gold">
        10 aulas entre hoje e sábado + sua redação corrigida em até 1 dia.
      </p>
      <Link
        to="/plantao-enem-2026"
        className="mt-3 block rounded-lg bg-plantao-gold px-4 py-2 text-center text-sm font-extrabold text-plantao-bg hover:opacity-90"
      >
        Quero garantir minha vaga →
      </Link>
    </div>
  );
};

export default PlantaoFloatingBox;
