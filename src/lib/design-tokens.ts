/**
 * GS Aprova Design System - Design Tokens
 * Extracted from existing project colors and typography
 */

export const designTokens = {
  colors: {
    // Primary - Blue (Confidence/Focus)
    primary: {
      DEFAULT: 'hsl(217, 81%, 54%)',
      foreground: 'hsl(0, 0%, 100%)',
      hover: 'hsl(217, 81%, 48%)',
      navy: 'hsl(220, 80%, 15%)',
      'navy-foreground': 'hsl(0, 0%, 100%)',
      'navy-light': 'hsl(220, 70%, 50%)'
    },
    
    // Secondary - Orange (Action/Conversion)
    secondary: {
      DEFAULT: 'hsl(24, 95%, 53%)',
      foreground: 'hsl(0, 0%, 100%)'
    },
    
    // Accent - Yellow (Urgency/Emphasis)
    accent: {
      DEFAULT: 'hsl(47, 96%, 54%)',
      foreground: 'hsl(219, 27%, 20%)',
      hover: 'hsl(47, 96%, 50%)'
    },
    
    // Success - Achievement Green
    success: {
      DEFAULT: 'hsl(142, 76%, 36%)',
      foreground: 'hsl(0, 0%, 98%)',
      light: 'hsl(142, 76%, 94%)'
    },
    
    // Muted - Light Gray
    muted: {
      DEFAULT: 'hsl(220, 14%, 96%)',
      foreground: 'hsl(219, 27%, 15%)'
    },
    
    // Base colors
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(219, 27%, 15%)',
    
    // Destructive
    destructive: {
      DEFAULT: 'hsl(0, 84.2%, 60.2%)',
      foreground: 'hsl(210, 40%, 98%)'
    }
  },
  
  typography: {
    hero: {
      size: 'text-4xl sm:text-5xl lg:text-6xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight',
      tracking: 'tracking-tight'
    },
    h1: {
      size: 'text-3xl sm:text-4xl lg:text-5xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight'
    },
    h2: {
      size: 'text-2xl sm:text-3xl lg:text-4xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight'
    },
    body: {
      size: 'text-base sm:text-lg',
      weight: 'font-normal',
      lineHeight: 'leading-relaxed'
    },
    subheadline: {
      size: 'text-lg sm:text-xl lg:text-2xl',
      weight: 'font-medium',
      lineHeight: 'leading-relaxed'
    }
  },
  
  spacing: {
    section: {
      DEFAULT: 'py-16 sm:py-20 lg:py-24',
      small: 'py-8 sm:py-12 lg:py-16'
    },
    container: {
      DEFAULT: 'container mx-auto px-4'
    }
  },
  
  effects: {
    gradient: {
      hero: 'bg-gradient-to-br from-primary-navy via-slate-800 to-purple-900',
      card: 'bg-gradient-to-br from-white to-slate-50',
      overlay: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
    },
    shadow: {
      card: 'shadow-lg hover:shadow-xl',
      cta: 'shadow-xl hover:shadow-2xl',
      hero: 'shadow-2xl'
    },
    transition: {
      smooth: 'transition-all duration-300 ease-out',
      bounce: 'transition-all duration-300 ease-in-out hover:scale-105'
    }
  }
} as const;

export type DesignTokens = typeof designTokens;