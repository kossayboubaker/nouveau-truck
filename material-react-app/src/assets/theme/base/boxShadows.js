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
 * The base box-shadow styles for the Material Dashboard 2 PRO React.
 * You can add new box-shadow using this file.
 * You can customized the box-shadow for the entire Material Dashboard 2 PRO React using thie file.
 */

// Material Dashboard 2 React Base Styles
import colors from "assets/theme/base/colors";

// Material Dashboard 2 React Helper Functions
import boxShadow from "assets/theme/functions/boxShadow";

const { black, white, tabs, coloredShadows } = colors;

const boxShadows = {
  xs: "0 2px 4px rgba(0, 0, 0, 0.25)",
  sm: "0 4px 8px rgba(0, 0, 0, 0.3)",
  md: "0 8px 25px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)",
  lg: "0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.25)",
  xl: "0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.3)",
  xxl: "0 25px 80px rgba(0, 0, 0, 0.6)",
  inset: "inset 0 1px 3px rgba(0, 0, 0, 0.2)",

  // Glass morphism shadows
  glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  glassHover: "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",

  // Neon glow effects
  neonBlue: "0 0 20px rgba(30, 42, 120, 0.4), 0 0 40px rgba(30, 42, 120, 0.2)",
  neonPurple: "0 0 20px rgba(92, 45, 213, 0.4), 0 0 40px rgba(92, 45, 213, 0.2)",
  neonCyan: "0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)",
  colored: {
    primary: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.primary,
      0.4
    )}`,
    secondary: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.secondary,
      0.4
    )}`,
    info: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.info,
      0.4
    )}`,
    success: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.success,
      0.4
    )}`,
    warning: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.warning,
      0.4
    )}`,
    error: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.error,
      0.4
    )}`,
    light: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.light,
      0.4
    )}`,
    dark: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.dark,
      0.4
    )}`,
  },

  navbarBoxShadow: `${boxShadow([0, 0], [1, 1], white.main, 0.9, "inset")}, ${boxShadow(
    [0, 20],
    [27, 0],
    black.main,
    0.05
  )}`,
  sliderBoxShadow: {
    thumb: boxShadow([0, 1], [13, 0], black.main, 0.2),
  },
  tabsBoxShadow: {
    indicator: boxShadow([0, 1], [5, 1], tabs.indicator.boxShadow, 1),
  },
};

export default boxShadows;
