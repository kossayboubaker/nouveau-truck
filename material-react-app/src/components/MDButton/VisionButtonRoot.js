/**
 * Vision UI Button Component
 * Enhanced button with glassmorphism and modern effects
 */

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import visionColors from "assets/theme/base/visionColors";

export default styled(Button)(({ theme, ownerState }) => {
  const { functions, borders } = theme;
  const { color, variant, size, circular, iconOnly, darkMode } = ownerState;

  const { pxToRem, rgba } = functions;
  const { borderRadius } = borders;

  // Vision UI Color mappings
  const getVisionColors = (colorName) => {
    const colorMappings = {
      primary: {
        main: visionColors.gradients.primary.main,
        hover: visionColors.gradients.primary.state,
        glow: visionColors.shadows.glow.primary,
        text: "#FFFFFF",
      },
      secondary: {
        main: visionColors.gradients.secondary.main,
        hover: visionColors.gradients.secondary.state,
        glow: visionColors.shadows.glow.secondary,
        text: "#FFFFFF",
      },
      info: {
        main: visionColors.gradients.accent.neon,
        hover: visionColors.gradients.info.state,
        glow: visionColors.shadows.glow.accent,
        text: "#FFFFFF",
      },
      success: {
        main: visionColors.gradients.success.main,
        hover: visionColors.gradients.success.state,
        glow: visionColors.shadows.glow.success,
        text: "#FFFFFF",
      },
      warning: {
        main: visionColors.gradients.warning.main,
        hover: visionColors.gradients.warning.state,
        glow: visionColors.shadows.glow.warning,
        text: "#000000",
      },
      error: {
        main: visionColors.gradients.error.main,
        hover: visionColors.gradients.error.state,
        glow: visionColors.shadows.glow.error,
        text: "#FFFFFF",
      },
      white: {
        main: "rgba(255, 255, 255, 0.1)",
        hover: "rgba(255, 255, 255, 0.2)",
        glow: "0 0 20px rgba(255, 255, 255, 0.3)",
        text: visionColors.core.text.secondary,
      },
      dark: {
        main: visionColors.gradients.light.main,
        hover: visionColors.gradients.light.state,
        glow: visionColors.shadows.glow.primary,
        text: "#FFFFFF",
      },
    };

    return colorMappings[colorName] || colorMappings.primary;
  };

  const colorScheme = getVisionColors(color);

  // Vision UI Contained Button Styles
  const visionContainedStyles = () => ({
    background: colorScheme.main,
    color: colorScheme.text,
    border: "none",
    borderRadius: "12px",
    boxShadow: `${colorScheme.glow}, ${visionColors.shadows.glass.medium}`,
    fontWeight: 600,
    textTransform: "none",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
      pointerEvents: "none",
      transition: "opacity 0.3s ease",
    },

    "&:hover": {
      background: colorScheme.hover,
      boxShadow: `0 0 40px ${colorScheme.glow.replace("0 0 30px ", "")}, ${visionColors.shadows.glass.large}`,
      transform: "translateY(-2px)",
      
      "&::before": {
        opacity: 0.3,
      },
    },

    "&:active": {
      transform: "translateY(0px)",
    },

    "&:focus": {
      boxShadow: `${colorScheme.glow}, 0 0 0 4px ${rgba(colorScheme.glow.replace("0 0 30px ", ""), 0.3)}`,
    },

    "&:disabled": {
      background: visionColors.core.background.tertiary,
      color: visionColors.core.text.disabled,
      boxShadow: "none",
      transform: "none",
    },
  });

  // Vision UI Outlined Button Styles
  const visionOutlinedStyles = () => ({
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    color: colorScheme.text === "#FFFFFF" ? visionColors.core.text.secondary : colorScheme.text,
    border: `1px solid ${visionColors.core.border.accent}`,
    borderRadius: "12px",
    fontWeight: 500,
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      border: `1px solid ${visionColors.accent.neon.cyan}`,
      color: visionColors.accent.neon.cyan,
      boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}`,
      transform: "translateY(-1px)",
    },

    "&:focus": {
      boxShadow: `0 0 0 4px ${visionColors.accent.glow.cyan}`,
    },

    "&:disabled": {
      background: "rgba(255, 255, 255, 0.02)",
      color: visionColors.core.text.disabled,
      border: `1px solid ${visionColors.core.border.secondary}`,
      transform: "none",
    },
  });

  // Vision UI Text Button Styles
  const visionTextStyles = () => ({
    background: "transparent",
    color: colorScheme.text === "#FFFFFF" ? visionColors.core.text.secondary : colorScheme.text,
    border: "none",
    borderRadius: "8px",
    fontWeight: 500,
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      background: "rgba(255, 255, 255, 0.05)",
      color: visionColors.accent.neon.cyan,
    },

    "&:focus": {
      background: "rgba(255, 255, 255, 0.05)",
    },

    "&:disabled": {
      color: visionColors.core.text.disabled,
    },
  });

  // Vision UI Gradient Button Styles (special variant)
  const visionGradientStyles = () => ({
    background: visionColors.gradients.vision.primary,
    color: "#FFFFFF",
    border: "none",
    borderRadius: "16px",
    boxShadow: `${visionColors.shadows.glow.primary}, ${visionColors.shadows.glass.medium}`,
    fontWeight: 600,
    textTransform: "none",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
      pointerEvents: "none",
      transition: "opacity 0.3s ease",
    },

    "&:hover": {
      background: visionColors.gradients.vision.secondary,
      boxShadow: `0 0 50px ${visionColors.accent.glow.cyan}, ${visionColors.shadows.glass.large}`,
      transform: "translateY(-3px) scale(1.02)",
      
      "&::before": {
        opacity: 0.4,
      },
    },

    "&:active": {
      transform: "translateY(-1px) scale(1.01)",
    },

    "&:disabled": {
      background: visionColors.core.background.tertiary,
      color: visionColors.core.text.disabled,
      boxShadow: "none",
      transform: "none",
    },
  });

  // Size styles
  const sizeStyles = () => {
    const sizes = {
      small: {
        padding: `${pxToRem(6)} ${pxToRem(16)}`,
        fontSize: pxToRem(12),
        minHeight: pxToRem(32),
      },
      medium: {
        padding: `${pxToRem(10)} ${pxToRem(24)}`,
        fontSize: pxToRem(14),
        minHeight: pxToRem(40),
      },
      large: {
        padding: `${pxToRem(14)} ${pxToRem(32)}`,
        fontSize: pxToRem(16),
        minHeight: pxToRem(48),
      },
    };

    return sizes[size] || sizes.medium;
  };

  // Circular styles
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });

  // Icon only styles
  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(40);
    
    if (size === "small") {
      sizeValue = pxToRem(32);
    } else if (size === "large") {
      sizeValue = pxToRem(56);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: 0,
      borderRadius: "12px",

      "& .material-icons": {
        marginTop: 0,
      },
    };
  };

  return {
    // Base styles
    ...sizeStyles(),
    
    // Variant styles
    ...(variant === "contained" && visionContainedStyles()),
    ...(variant === "outlined" && visionOutlinedStyles()),
    ...(variant === "text" && visionTextStyles()),
    ...(variant === "gradient" && visionGradientStyles()),
    
    // Modifier styles
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});
