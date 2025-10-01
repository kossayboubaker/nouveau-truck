/**
 * Vision UI Dashboard Layout - Premium Edition
 * Inspired by modern dashboard designs with stunning gradients
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";

function VisionDashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        minHeight: "100vh",
        background: "transparent",
        
        // Main content area with proper spacing
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 2, sm: 3 },
        
        // Responsive sidebar spacing
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(80) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
        
        // Smooth transitions
        transition: transitions.create(["margin-left"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      })}
    >
      {/* Scrollable Content Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: { xs: "100%", xl: "calc(100vw - 320px)" },
          mx: "auto",
          
          // Perfect height management
          height: "calc(100vh - 80px)",
          maxHeight: "calc(100vh - 80px)",
          overflowY: "auto",
          overflowX: "hidden",
          
          // Premium scrollbar styling
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "4px",
            backdropFilter: "blur(10px)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6))",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))",
            },
          },
          
          // Smooth scroll behavior
          scrollBehavior: "smooth",
          
          // Grid system improvements for premium layout
          "& .MuiGrid-container": {
            margin: "0 !important",
            width: "100% !important",
            "& .MuiGrid-item": {
              paddingLeft: { xs: "8px", sm: "12px", md: "16px" },
              paddingTop: { xs: "8px", sm: "12px", md: "16px" },
            },
          },
          
          // Card hover effects and spacing
          "& .MuiCard-root": {
            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          },
          
          // Responsive spacing adjustments
          "& > *": {
            marginBottom: { xs: "16px", sm: "20px", md: "24px" },
            "&:last-child": {
              marginBottom: 0,
            },
          },
        }}
      >
        {children}
      </Box>

      {/* Premium decorative corner elements */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "linear-gradient(225deg, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
          clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
          backdropFilter: "blur(5px)",
        }}
      />
      
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "300px",
          height: "300px",
          background: "linear-gradient(45deg, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
          backdropFilter: "blur(5px)",
        }}
      />

      {/* Subtle grid overlay for premium feel */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: -2,
          opacity: 0.5,
        }}
      />

      {/* Global premium animations */}
      <style jsx global>{`
        @keyframes premiumSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes premiumPulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        @keyframes premiumFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes gradientMove {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Premium card animations */
        .MuiCard-root {
          animation: premiumSlideIn 0.6s ease-out;
        }

        /* Responsive improvements for premium design */
        @media (max-width: 768px) {
          .MuiGrid-container .MuiGrid-item {
            padding-left: 8px !important;
            padding-top: 8px !important;
          }
        }

        @media (max-width: 480px) {
          .MuiGrid-container .MuiGrid-item {
            padding-left: 6px !important;
            padding-top: 6px !important;
          }
        }

        /* High performance mode */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Premium theme for different screen sizes */
        @media (min-width: 1920px) {
          .MuiContainer-root {
            max-width: 1400px !important;
          }
        }

        @media (min-width: 2560px) {
          .MuiContainer-root {
            max-width: 1800px !important;
          }
        }
      `}</style>
    </MDBox>
  );
}

// Typechecking props for the VisionDashboardLayout
VisionDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VisionDashboardLayout;
