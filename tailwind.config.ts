import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx,html}"],
  theme: {
    extend: {
      colors: {
        /* mapeia CSS vars -> Tailwind tokens */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",

        /* atalhos semânticos para azul/amarelo GS */
        brand: {
          blue: {
            800: "#0F3763", // fundo principal
            700: "#0B2B4E",
            500: "#154A86",
          },
          yellow: {
            700: "#E4AF2A", // hover CTA
            600: "#F0C254", // CTA principal
            500: "#FFD15A",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config
