/**
 * Vision UI Input Component
 * Enhanced input with glassmorphism and modern effects
 */

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import visionColors from "assets/theme/base/visionColors";

export default styled(TextField)(({ theme, ownerState }) => {
  const { functions } = theme;
  const { error, success, disabled } = ownerState;

  const { rgba } = functions;

  // Base Vision UI styles
  const baseStyles = {
    "& .MuiOutlinedInput-root": {
      background: visionColors.components.input.background,
      borderRadius: "12px",
      border: `1px solid ${visionColors.components.input.border}`,
      backdropFilter: "blur(10px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      color: visionColors.components.input.text,
      
      "&:hover": {
        border: `1px solid ${visionColors.core.border.accent}`,
        background: "rgba(15, 20, 25, 0.7)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      },

      "&.Mui-focused": {
        border: `1px solid ${visionColors.accent.neon.cyan}`,
        background: "rgba(15, 20, 25, 0.8)",
        boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}, 0 4px 20px rgba(0, 0, 0, 0.3)`,
      },

      "& fieldset": {
        border: "none",
      },

      "& input": {
        color: visionColors.components.input.text,
        fontSize: "1rem",
        padding: "14px 16px",
        
        "&::placeholder": {
          color: visionColors.core.text.tertiary,
          opacity: 1,
        },
      },

      "& textarea": {
        color: visionColors.components.input.text,
        fontSize: "1rem",
        
        "&::placeholder": {
          color: visionColors.core.text.tertiary,
          opacity: 1,
        },
      },
    },

    "& .MuiInputLabel-root": {
      color: visionColors.components.input.label,
      fontSize: "0.95rem",
      fontWeight: 500,
      transform: "translate(16px, 14px) scale(1)",
      
      "&.Mui-focused": {
        color: visionColors.accent.neon.cyan,
        transform: "translate(16px, -9px) scale(0.85)",
      },
      
      "&.MuiInputLabel-shrink": {
        transform: "translate(16px, -9px) scale(0.85)",
        background: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 20, 25, 0.8) 50%, rgba(15, 20, 25, 0.8) 100%)",
        padding: "0 8px",
        marginLeft: "-8px",
      },
    },

    "& .MuiFormHelperText-root": {
      color: visionColors.core.text.tertiary,
      fontSize: "0.875rem",
      marginTop: "8px",
      marginLeft: "16px",
    },
  };

  // Error state styles
  const errorStyles = error ? {
    "& .MuiOutlinedInput-root": {
      border: `1px solid ${visionColors.status.error.main}`,
      
      "&:hover": {
        border: `1px solid ${visionColors.status.error.light}`,
        boxShadow: `0 0 10px ${visionColors.status.error.glow}`,
      },

      "&.Mui-focused": {
        border: `1px solid ${visionColors.status.error.main}`,
        boxShadow: `0 0 20px ${visionColors.status.error.glow}`,
      },
    },

    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: visionColors.status.error.main,
      },
    },

    "& .MuiFormHelperText-root": {
      color: visionColors.status.error.main,
    },
  } : {};

  // Success state styles
  const successStyles = success ? {
    "& .MuiOutlinedInput-root": {
      border: `1px solid ${visionColors.status.success.main}`,
      
      "&:hover": {
        border: `1px solid ${visionColors.status.success.light}`,
        boxShadow: `0 0 10px ${visionColors.status.success.glow}`,
      },

      "&.Mui-focused": {
        border: `1px solid ${visionColors.status.success.main}`,
        boxShadow: `0 0 20px ${visionColors.status.success.glow}`,
      },
    },

    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: visionColors.status.success.main,
      },
    },

    "& .MuiFormHelperText-root": {
      color: visionColors.status.success.main,
    },
  } : {};

  // Disabled state styles
  const disabledStyles = disabled ? {
    "& .MuiOutlinedInput-root": {
      background: "rgba(15, 20, 25, 0.3)",
      border: `1px solid ${visionColors.core.border.secondary}`,
      color: visionColors.core.text.disabled,
      
      "&:hover": {
        border: `1px solid ${visionColors.core.border.secondary}`,
        background: "rgba(15, 20, 25, 0.3)",
        boxShadow: "none",
      },

      "& input": {
        color: visionColors.core.text.disabled,
        cursor: "not-allowed",
      },

      "& textarea": {
        color: visionColors.core.text.disabled,
        cursor: "not-allowed",
      },
    },

    "& .MuiInputLabel-root": {
      color: visionColors.core.text.disabled,
      
      "&.Mui-focused": {
        color: visionColors.core.text.disabled,
      },
    },
  } : {};

  return {
    ...baseStyles,
    ...errorStyles,
    ...successStyles,
    ...disabledStyles,
  };
});
