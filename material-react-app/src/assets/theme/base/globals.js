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

// Material Dashboard 2 React Base Styles
import colors from "assets/theme/base/colors";

const { info, dark } = colors;

const globals = {
  "@import": [
    "url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;900&family=Poppins:wght@200;300;400;500;600;700;900&display=swap')"
  ],
  html: {
    scrollBehavior: "smooth",
    overflowX: "hidden",
    background: "#0F1419",
  },
  body: {
    background: "linear-gradient(135deg, #0F1419 0%, #1A202C 100%)",
    minHeight: "100vh",
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    color: "#A0AEC0",
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
    color: "inherit",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${info.main} !important`,
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: "#00D4FF !important",
    textShadow: "0 0 8px rgba(0, 212, 255, 0.3)",
  },
  // Custom scrollbar
  "::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "::-webkit-scrollbar-track": {
    background: "rgba(26, 32, 44, 0.5)",
    borderRadius: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "linear-gradient(135deg, #5C2DD5, #7B42F6)",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "linear-gradient(135deg, #7B42F6, #9F7AEA)",
  },
  // Selection styles
  "::selection": {
    background: "rgba(92, 45, 213, 0.3)",
    color: "#FFFFFF",
  },
  "::-moz-selection": {
    background: "rgba(92, 45, 213, 0.3)",
    color: "#FFFFFF",
  },
};

export default globals;
