/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * The base colors for the Material Dashboard 2 PRO React.
 * You can add new color using this file.
 * You can customized the colors for the entire Material Dashboard 2 PRO React using thie file.
 */

const colors = {
  background: {
    default: "#0F1419",
    paper: "#1A202C",
    card: "#1A202C",
  },

  text: {
    main: "#A0AEC0",
    focus: "#FFFFFF",
    secondary: "#718096",
    disabled: "#4A5568",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#000000",
    main: "#000000",
    focus: "#000000",
  },

  primary: {
    main: "#1E2A78",
    focus: "#1A237E",
    light: "#3F51B5",
    dark: "#0D1642",
  },

  secondary: {
    main: "#5C2DD5",
    focus: "#7B42F6",
    light: "#9F7AEA",
    dark: "#44337A",
  },

  info: {
    main: "#00D4FF",
    focus: "#00B8E6",
    light: "#4DDDFF",
    dark: "#0099CC",
  },

  success: {
    main: "#01B574",
    focus: "#00A65A",
    light: "#34C88A",
    dark: "#016B41",
  },

  warning: {
    main: "#FFB547",
    focus: "#FF9F1A",
    light: "#FFC56B",
    dark: "#E6A041",
  },

  error: {
    main: "#E31A1A",
    focus: "#D50000",
    light: "#EF5350",
    dark: "#B71C1C",
  },

  light: {
    main: "#2D3748",
    focus: "#4A5568",
  },

  dark: {
    main: "#0F1419",
    focus: "#1A202C",
  },

  grey: {
    100: "#F7FAFC",
    200: "#EDF2F7",
    300: "#E2E8F0",
    400: "#CBD5E0",
    500: "#A0AEC0",
    600: "#718096",
    700: "#4A5568",
    800: "#2D3748",
    900: "#1A202C",
  },

  gradients: {
    primary: {
      main: "linear-gradient(135deg, #1E2A78 0%, #3F51B5 100%)",
      state: "linear-gradient(135deg, #1A237E 0%, #303F9F 100%)",
    },

    secondary: {
      main: "linear-gradient(135deg, #5C2DD5 0%, #7B42F6 100%)",
      state: "linear-gradient(135deg, #44337A 0%, #673AB7 100%)",
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

    // Special Vision UI gradients
    visionPrimary: {
      main: "linear-gradient(135deg, #1E2A78 0%, #5C2DD5 50%, #7B42F6 100%)",
      state: "linear-gradient(135deg, #1A237E 0%, #44337A 50%, #673AB7 100%)",
    },

    visionNeon: {
      main: "linear-gradient(135deg, #00D4FF 0%, #01B574 100%)",
      state: "linear-gradient(135deg, #00B8E6 0%, #00A65A 100%)",
    },

    glassEffect: {
      main: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      border: "rgba(255, 255, 255, 0.2)",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  badgeColors: {
    primary: {
      background: "#f8b3ca",
      text: "#cc084b",
    },

    secondary: {
      background: "#d7d9e1",
      text: "#6c757d",
    },

    info: {
      background: "#aecef7",
      text: "#095bc6",
    },

    success: {
      background: "#bce2be",
      text: "#339537",
    },

    warning: {
      background: "#ffd59f",
      text: "#c87000",
    },

    error: {
      background: "#fcd3d0",
      text: "#f61200",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },
  },

  coloredShadows: {
    primary: "#e91e62",
    secondary: "#110e0e",
    info: "#00bbd4",
    success: "#4caf4f",
    warning: "#ff9900",
    error: "#f44336",
    light: "#adb5bd",
    dark: "#404040",
  },

  inputBorderColor: "#d2d6da",

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
