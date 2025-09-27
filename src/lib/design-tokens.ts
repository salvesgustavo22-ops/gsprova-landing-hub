export const designTokens = {
  colors: {
    gs: {
      primary: "#1E3A8A",
      secondary: "#3B82F6",
      accent: "#FBBF24",
      neutral: "#F3F4F6",
      dark: "#0F172A",
      text: "#111827",
      white: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: {
      heading: "Montserrat, Poppins, Arial, sans-serif",
      body: "Inter, Arial, sans-serif",
    },
    sizes: {
      h1: "clamp(2.5rem, 6vw, 3.5rem)",
      h2: "clamp(1.75rem, 4vw, 2.25rem)",
      body: "clamp(1rem, 2vw, 1.125rem)",
      caption: "clamp(0.75rem, 1vw, 0.875rem)",
    },
    weight: {
      bold: 700,
      regular: 400,
      medium: 500,
    },
    lineHeight: {
      heading: 1.3,
      body: 1.6,
    },
  },
  spacing: {
    section: {
      DEFAULT: "py-16 md:py-24",
      small: "py-8 md:py-12",
    },
    container: "mx-auto px-4 md:px-6",
    card: "p-6 md:p-8",
    rounded: "rounded-2xl",
  },
};
