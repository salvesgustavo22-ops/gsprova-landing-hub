import { Check } from 'lucide-react';
import logo from '@/assets/novo-logo-gsaprova-novembro-2.jpg';

export const BannerInicial = () => {
  return (
    <section className="bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/80 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
          {/* Logo */}
          <div className="shrink-0">
            <img 
              src={logo} 
              alt="GS Aprova - Plataforma de correção de redação e preparação para ENEM e vestibulares" 
              className="h-24 w-auto md:h-32"
            />
          </div>

          {/* Bullets */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              GS Aprova — Sua aprovação é nossa missão
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 size-6 shrink-0 text-[#FBBF24]" />
                <span className="text-base text-white md:text-lg">
                  Cursos intensivos focados no ENEM e principais vestibulares
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 size-6 shrink-0 text-[#FBBF24]" />
                <span className="text-base text-white md:text-lg">
                  Correção de redação com critérios oficiais e devolutiva em 48h
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 size-6 shrink-0 text-[#FBBF24]" />
                <span className="text-base text-white md:text-lg">
                  Materiais exclusivos baseados em análise de dados oficiais INEP
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 size-6 shrink-0 text-[#FBBF24]" />
                <span className="text-base text-white md:text-lg">
                  Mentoria individual e acompanhamento personalizado
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
