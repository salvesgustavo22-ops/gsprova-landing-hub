// A/B Testing flags for GS Aprova
export const experiments = {
  HERO_VARIANT: 'light' as 'light' | 'dark',
  CTA_COLOR_MODE: 'accent' as 'accent' | 'primary',
} as const;

export type HeroVariant = typeof experiments.HERO_VARIANT;
export type CTAColorMode = typeof experiments.CTA_COLOR_MODE;
