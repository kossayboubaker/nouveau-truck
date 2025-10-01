/**
 * Vision UI Advanced Color System
 * Enhanced color palette for modern glassmorphism design
 */

const visionColors = {
  // Core Vision UI Colors (basé sur la capture)
  core: {
    background: {
      primary: "#0B0E27",        // Bleu très foncé comme dans la capture
      secondary: "#151B3D",      // Bleu foncé pour les cartes
      tertiary: "#1E2A78",       // Bleu moyen
      glass: "rgba(21, 27, 61, 0.8)",
      overlay: "rgba(11, 14, 39, 0.95)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B8C2DB",      // Bleu clair pour le texte secondaire
      tertiary: "#8B95B8",       // Bleu moyen pour le texte tertiaire
      disabled: "#4A5568",
      accent: "#E8EEFF",         // Blanc très légèrement teinté de bleu
    },
    border: {
      primary: "rgba(184, 194, 219, 0.12)",  // Bordure bleutée subtile
      secondary: "rgba(184, 194, 219, 0.06)",
      accent: "rgba(0, 212, 255, 0.25)",     // Bordure cyan pour les accents
    },
  },

  // Brand Colors (basé sur la capture Vision UI)
  brand: {
    primary: {
      50: "#F0F4FF",
      100: "#E5EDFF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#1E2A78", // Bleu principal de la capture
      600: "#151B3D", // Bleu très foncé pour les cartes
      700: "#0B0E27", // Fond principal
      800: "#070A1F",
      900: "#040612",
    },
    secondary: {
      50: "#F0FDFF",
      100: "#E0FBFF",
      200: "#BAF5FF",
      300: "#7CEDFF",
      400: "#38E4FF",
      500: "#00D4FF", // Cyan principal de la capture
      600: "#00B8E6",
      700: "#0099CC",
      800: "#006B8F",
      900: "#004A63",
    },
  },

  // Accent Colors (basé sur la capture Vision UI)
  accent: {
    neon: {
      cyan: "#00D4FF",      // Cyan principal comme dans la capture
      blue: "#4D9AFF",      // Bleu accent
      teal: "#00E5CC",      // Turquoise pour les graphiques
      purple: "#8B5CF6",    // Violet pour les accents
      orange: "#FF8A47",    // Orange pour les alertes
    },
    glow: {
      cyan: "rgba(0, 212, 255, 0.6)",     // Glow plus intense
      blue: "rgba(77, 154, 255, 0.5)",
      teal: "rgba(0, 229, 204, 0.5)",
      purple: "rgba(139, 92, 246, 0.5)",
      orange: "rgba(255, 138, 71, 0.5)",
    },
  },

  // Gradient System (basé sur la capture Vision UI)
  gradients: {
    primary: {
      main: "linear-gradient(135deg, #151B3D 0%, #1E2A78 100%)",        // Bleu foncé vers bleu moyen
      state: "linear-gradient(135deg, #0B0E27 0%, #151B3D 100%)",       // Plus sombre pour hover
      light: "linear-gradient(135deg, #1E2A78 0%, #4D9AFF 100%)",       // Vers bleu clair
      dark: "linear-gradient(135deg, #070A1F 0%, #0B0E27 100%)",        // Très sombre
    },
    secondary: {
      main: "linear-gradient(135deg, #00D4FF 0%, #4D9AFF 100%)",        // Cyan vers bleu
      state: "linear-gradient(135deg, #00B8E6 0%, #0099CC 100%)",       // Plus sombre
      light: "linear-gradient(135deg, #4D9AFF 0%, #00E5CC 100%)",       // Vers turquoise
      dark: "linear-gradient(135deg, #006B8F 0%, #004A63 100%)",        // Foncé
    },
    info: {
      main: "linear-gradient(135deg, #00D4FF 0%, #4DDDFF 100%)",
      state: "linear-gradient(135deg, #00B8E6 0%, #0099CC 100%)",
    },
    success: {
      main: "linear-gradient(135deg, #01B574 0%, #34C88A 100%)",
      state: "linear-gradient(135deg, #00A65A 0%, #2E7D32 100%)",
    },
    warning: {
      main: "linear-gradient(135deg, #FFB547 0%, #FFC56B 100%)",
      state: "linear-gradient(135deg, #FF9F1A 0%, #F57C00 100%)",
    },
    error: {
      main: "linear-gradient(135deg, #E31A1A 0%, #EF5350 100%)",
      state: "linear-gradient(135deg, #D50000 0%, #C62828 100%)",
    },
    light: {
      main: "linear-gradient(135deg, #2D3748 0%, #4A5568 100%)",
      state: "linear-gradient(135deg, #1A202C 0%, #2D3748 100%)",
    },
    dark: {
      main: "linear-gradient(135deg, #0F1419 0%, #1A202C 100%)",
      state: "linear-gradient(135deg, #000000 0%, #0F1419 100%)",
    },
    accent: {
      neon: "linear-gradient(135deg, #00D4FF 0%, #01B574 100%)",
      neonAlt: "linear-gradient(135deg, #9F7AEA 0%, #FF69B4 100%)",
      warm: "linear-gradient(135deg, #FFB547 0%, #FF8A80 100%)",
    },
    vision: {
      primary: "linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)",
      secondary: "linear-gradient(135deg, #00D4FF 0%, #01B574 100%)",
      tertiary: "linear-gradient(135deg, #FFB547 0%, #9F7AEA 100%)",
    },
    glass: {
      primary: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      secondary: "linear-gradient(135deg, rgba(92, 45, 213, 0.2) 0%, rgba(123, 66, 246, 0.1) 100%)",
      accent: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(1, 181, 116, 0.1) 100%)",
    },
    // Special Vision UI gradients
    visionPrimary: {
      main: "linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)",
      state: "linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)",
    },
    visionNeon: {
      main: "linear-gradient(135deg, #00D4FF 0%, #01B574 100%)",
      state: "linear-gradient(135deg, #00B8E6 0%, #00A65A 100%)",
    },
  },

  // Status Colors
  status: {
    success: {
      main: "#01B574",
      light: "#34C88A",
      dark: "#016B41",
      glow: "rgba(1, 181, 116, 0.4)",
    },
    warning: {
      main: "#FFB547",
      light: "#FFC56B",
      dark: "#E6A041",
      glow: "rgba(255, 181, 71, 0.4)",
    },
    error: {
      main: "#E31A1A",
      light: "#EF5350",
      dark: "#B71C1C",
      glow: "rgba(227, 26, 26, 0.4)",
    },
    info: {
      main: "#00D4FF",
      light: "#4DDDFF",
      dark: "#0099CC",
      glow: "rgba(0, 212, 255, 0.4)",
    },
  },

  // Semantic Colors
  semantic: {
    truck: {
      active: "#01B574",
      inactive: "#718096",
      maintenance: "#FFB547",
      offline: "#E31A1A",
    },
    delivery: {
      pending: "#FFB547",
      inProgress: "#00D4FF",
      completed: "#01B574",
      failed: "#E31A1A",
    },
    driver: {
      available: "#01B574",
      busy: "#FFB547",
      offline: "#718096",
    },
  },

  // Shadow System
  shadows: {
    glass: {
      small: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      medium: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      large: "0 16px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    },
    glow: {
      primary: "0 0 30px rgba(30, 42, 120, 0.4)",
      secondary: "0 0 30px rgba(92, 45, 213, 0.4)",
      accent: "0 0 30px rgba(0, 212, 255, 0.4)",
      success: "0 0 30px rgba(1, 181, 116, 0.4)",
      warning: "0 0 30px rgba(255, 181, 71, 0.4)",
      error: "0 0 30px rgba(227, 26, 26, 0.4)",
    },
    elevation: {
      1: "0 2px 8px rgba(0, 0, 0, 0.15)",
      2: "0 4px 16px rgba(0, 0, 0, 0.15)",
      3: "0 8px 24px rgba(0, 0, 0, 0.15)",
      4: "0 16px 32px rgba(0, 0, 0, 0.15)",
      5: "0 24px 48px rgba(0, 0, 0, 0.15)",
    },
  },

  // Component-specific colors
  components: {
    card: {
      background: "rgba(26, 32, 44, 0.8)",
      border: "rgba(255, 255, 255, 0.1)",
      hover: "rgba(26, 32, 44, 0.9)",
    },
    button: {
      primary: {
        background: "linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)",
        hover: "linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)",
        shadow: "0 0 20px rgba(92, 45, 213, 0.4)",
        hoverShadow: "0 0 30px rgba(92, 45, 213, 0.6)",
      },
      secondary: {
        background: "rgba(255, 255, 255, 0.1)",
        hover: "rgba(255, 255, 255, 0.2)",
        border: "rgba(255, 255, 255, 0.2)",
      },
    },
    input: {
      background: "rgba(15, 20, 25, 0.5)",
      border: "rgba(255, 255, 255, 0.1)",
      focus: "rgba(0, 212, 255, 0.3)",
      label: "#A0AEC0",
      text: "#FFFFFF",
    },
    table: {
      header: "rgba(15, 20, 25, 0.8)",
      row: "rgba(26, 32, 44, 0.4)",
      rowHover: "rgba(26, 32, 44, 0.6)",
      border: "rgba(255, 255, 255, 0.1)",
    },
  },

  // Animation colors
  animation: {
    pulse: {
      primary: "rgba(30, 42, 120, 0.6)",
      secondary: "rgba(92, 45, 213, 0.6)",
      accent: "rgba(0, 212, 255, 0.6)",
    },
  },
};

export default visionColors;
