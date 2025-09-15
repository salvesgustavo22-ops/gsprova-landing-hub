// src/components/legal/ConsentCheckboxes.tsx
import React, { useEffect, useState } from "react";
import { CookiePrefs, getCookiePrefs, setCookiePrefs } from "../../lib/legal";

export default function ConsentCheckboxes() {
  const [prefs, setPrefs] = useState<CookiePrefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const saved = getCookiePrefs();
    if (saved) setPrefs(saved);
  }, []);

  const update = (key: keyof CookiePrefs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...prefs, [key]: e.target.checked || key === "necessary" };
    if (key === "necessary") next.necessary = true; // nunca desmarca
    setPrefs(next);
  };

  const save = () => {
    setCookiePrefs(prefs);
    alert("Preferências salvas.");
  };

  return (
    <div id="cookie-preferences" className="rounded-2xl border p-4 space-y-3">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked readOnly />
        <span><strong>Necessários</strong> (sempre ativos)</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={prefs.analytics} onChange={update("analytics")} />
        <span>Analytics</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={prefs.marketing} onChange={update("marketing")} />
        <span>Marketing</span>
      </label>

      <button onClick={save} className="rounded-xl border px-3 py-2 text-sm">
        Salvar preferências
      </button>
    </div>
  );
}
