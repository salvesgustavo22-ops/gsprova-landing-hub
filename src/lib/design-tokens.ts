/**
 * GS Aprova Design System - Design Tokens (Modern Light Theme)
 * Updated to match the new clean, modern design with navy blue and golden accents
 */

export const designTokens = {
  colors: {
    // Primary - Deep Navy Blue (Professional/Trust)
    primary: {
      DEFAULT: 'hsl(211, 54%, 25%)',
      foreground: 'hsl(0, 0%, 100%)',
      hover: 'hsl(211, 54%, 20%)',
      navy: 'hsl(211, 54%, 20%)',
      'navy-foreground': 'hsl(0, 0%, 100%)',
      'navy-light': 'hsl(211, 54%, 35%)',
    },

    // Secondary - Light backgrounds
    secondary: {
      DEFAULT: 'hsl(210, 20%, 96%)',
      foreground: 'hsl(211, 20%, 20%)',
    },

    // Accent - Golden Yellow (Action/Emphasis)
    accent: {
      DEFAULT: 'hsl(47, 100%, 65%)',
      foreground: 'hsl(211, 54%, 20%)',
      hover: 'hsl(43, 95%, 58%)',
      soft: 'hsl(47, 100%, 75%)',
    },

    // Success - Achievement Green
    success: {
      DEFAULT: 'hsl(142, 76%, 45%)',
      foreground: 'hsl(0, 0%, 100%)',
      light: 'hsl(142, 76%, 94%)',
    },

    // Muted - Soft Gray
    muted: {
      DEFAULT: 'hsl(210, 20%, 96%)',
      foreground: 'hsl(211, 15%, 45%)',
    },

    // Base colors - Clean white
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(211, 20%, 20%)',

    // Destructive
    destructive: {
      DEFAULT: 'hsl(0, 84.2%, 60.2%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
  },

  typography: {
    hero: {
      size: 'text-4xl sm:text-5xl lg:text-6xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight',
      tracking: 'tracking-tight',
    },
    h1: {
      size: 'text-3xl sm:text-4xl lg:text-5xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight',
    },
    h2: {
      size: 'text-2xl sm:text-3xl lg:text-4xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight',
    },
    body: {
      size: 'text-base sm:text-lg',
      weight: 'font-normal',
      lineHeight: 'leading-relaxed',
    },
    subheadline: {
      size: 'text-lg sm:text-xl lg:text-2xl',
      weight: 'font-medium',
      lineHeight: 'leading-relaxed',
    },
  },

  spacing: {
    section: {
      DEFAULT: 'py-16 sm:py-20 lg:py-24',
      small: 'py-8 sm:py-12 lg:py-16',
    },
    container: {
      DEFAULT: 'container mx-auto px-4',
    },
  },

  effects: {
    gradient: {
      hero: 'bg-[linear-gradient(135deg,_hsl(211_54%_25%)_0%,_hsl(211_54%_20%)_50%,_hsl(220_60%_15%)_100%)]',
      accent: 'bg-gradient-to-r from-accent to-accent-hover',
      card: 'bg-gradient-to-br from-white to-secondary',
      overlay: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
    },
    shadow: {
      card: 'shadow-[0_4px_12px_-2px_hsl(211_54%_25%/0.08)]',
      cardHover: 'shadow-[0_8px_24px_-4px_hsl(211_54%_25%/0.12)]',
      cta: 'shadow-[0_4px_16px_-4px_hsl(47_100%_65%/0.3)]',
      glow: 'shadow-[0_0_40px_hsl(47_100%_65%/0.4)]',
    },
    transition: {
      smooth: 'transition-all duration-300 ease-out',
      bounce: 'transition-all duration-300 ease-in-out hover:scale-105',
      fast: 'transition-all duration-150 ease-out',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
