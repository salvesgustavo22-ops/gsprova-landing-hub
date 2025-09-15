// src/lib/legal.ts
export const ORG_LEGAL_NAME = "GUSTAVO SOUZA ALVES";
export const ORG_CNPJ = "55.454.341/0001-29";
export const CONTACT_EMAIL = "gsaprova@gsmatematicanegocios.com.br";
export const WHATSAPP_LINK = "https://wa.me/5511974969036";
export const LAST_UPDATED = "15/09/2025";

// Preferências de cookies salvas em localStorage (sem libs externas)
const STORAGE_KEY = "gsaprova.cookie.prefs";

export type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function getCookiePrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePrefs) : null;
  } catch {
    return null;
  }
}

export function setCookiePrefs(prefs: CookiePrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, necessary: true }));
}
