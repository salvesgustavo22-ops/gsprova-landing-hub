// src/components/legal/CookieBanner.tsx
import React, { useEffect, useState } from "react";
import { setCookiePrefs, getCookiePrefs, CookiePrefs } from "../../lib/legal";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefs = getCookiePrefs();
    if (!prefs) setVisible(true);
  }, []);

  const acceptAll = () => {
    const all: CookiePrefs = { necessary: true, analytics: true, marketing: true };
    setCookiePrefs(all);
    setVisible(false);
  };

  const rejectNonEssential = () => {
    const minimal: CookiePrefs = { necessary: true, analytics: false, marketing: false };
    setCookiePrefs(minimal);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-4 shadow">
        <p className="mb-3 text-sm">
          Usamos cookies para melhorar sua experiência, medir audiência e personalizar conteúdo.
          Você pode aceitar todos ou gerenciar preferências. Ao continuar, você concorda com esta Política de Privacidade.
        </p>
        <div className="flex gap-2">
          <button onClick={acceptAll} className="rounded-xl border px-3 py-2 text-sm">
            Aceitar todos
          </button>
          <button onClick={rejectNonEssential} className="rounded-xl border px-3 py-2 text-sm">
            Rejeitar não essenciais
          </button>
          <a
            href="#cookie-preferences"
            className="rounded-xl border px-3 py-2 text-sm underline"
            onClick={() => setVisible(false)}
          >
            Gerenciar preferências
          </a>
        </div>
      </div>
    </div>
  );
}
