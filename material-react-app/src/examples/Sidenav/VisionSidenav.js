/**
 * Vision UI Sidenav Component
 * Enhanced sidebar with glassmorphism and modern design
 */

import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  List,
  Divider,
  Link,
  Icon,
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

// Translation
import { useTranslation } from "react-i18next";

// Vision UI colors
import visionColors from "assets/theme/base/visionColors";

function VisionSidenav({ color = "info", brand = "", brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));

  const collapseName = location.pathname.replace("/", "");

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location, transparentSidenav, whiteSidenav]);

  // Enhanced route rendering with Vision UI styling
  const renderRoutes = routes.map(({ type, nameKey, title, icon, noCollapse, key, href, route, disabled }) => {
    if (type === "collapse") {
      const translatedName = t(`menu.${nameKey}`);

      const content = (
        <Box
          sx={{
            my: 0.5,
            mx: 1,
            borderRadius: "12px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            
            "&:hover": {
              background: "rgba(0, 212, 255, 0.1)",
              transform: "translateX(8px)",
              
              "& .vision-nav-icon": {
                color: visionColors.accent.neon.cyan,
                textShadow: `0 0 10px ${visionColors.accent.neon.cyan}`,
              },
              
              "& .vision-nav-text": {
                color: visionColors.accent.neon.cyan,
              },
            },
            
            "&.active": {
              background: visionColors.gradients.accent.neon,
              boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}`,
              
              "& .vision-nav-icon, & .vision-nav-text": {
                color: "#000000",
                fontWeight: 600,
              },
              
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "60%",
                background: "#000000",
                borderRadius: "0 4px 4px 0",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Icon
              className="vision-nav-icon"
              sx={{
                fontSize: "20px",
                color: visionColors.core.text.secondary,
                mr: miniSidenav ? 0 : 2,
                transition: "all 0.3s ease",
              }}
            >
              {icon}
            </Icon>
            
            {!miniSidenav && (
              <Typography
                className="vision-nav-text"
                variant="body1"
                sx={{
                  color: visionColors.core.text.secondary,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  opacity: miniSidenav ? 0 : 1,
                }}
              >
                {translatedName}
              </Typography>
            )}
          </Box>
        </Box>
      );

      return (
        <Link
          key={key}
          component={route ? NavLink : "a"}
          to={route}
          href={href}
          target={href ? "_blank" : ""}
          rel={href ? "noreferrer" : ""}
          sx={{ textDecoration: "none" }}
          className={location.pathname === route ? "active" : ""}
        >
          {content}
        </Link>
      );
    } else if (type === "title") {
      return (
        <Typography
          key={key}
          variant="caption"
          sx={{
            color: visionColors.core.text.tertiary,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            px: 3,
            py: 2,
            mt: 3,
            opacity: miniSidenav ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {t(`menu.${nameKey}`)}
        </Typography>
      );
    } else if (type === "divider") {
      return (
        <Divider
          key={key}
          sx={{
            my: 2,
            mx: 2,
            background: visionColors.core.border.primary,
            opacity: miniSidenav ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      );
    }

    return null;
  });

  // Sidebar content
  const sidenavContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: visionColors.components.card.background,
        backdropFilter: "blur(20px)",
        borderRight: `1px solid ${visionColors.components.card.border}`,
        position: "relative",
        overflow: "hidden",
        
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, transparent 30%, transparent 70%, rgba(92, 45, 213, 0.05) 100%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Brand/Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${visionColors.core.border.primary}`,
          background: "rgba(15, 20, 25, 0.6)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: miniSidenav ? "center" : "flex-start",
          }}
        >
          {brand && (
            <Avatar
              src={brand}
              sx={{
                width: 40,
                height: 40,
                mr: miniSidenav ? 0 : 2,
                border: `2px solid ${visionColors.accent.neon.cyan}`,
                boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}`,
              }}
            />
          )}
          
          {!miniSidenav && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: visionColors.core.text.primary,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  mb: 0.5,
                  background: "linear-gradient(135deg, #FFFFFF 0%, #00D4FF 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {brandName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: visionColors.core.text.tertiary,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                Fleet Management
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          py: 2,
          
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: visionColors.gradients.accent.neon,
            borderRadius: "2px",
          },
        }}
      >
        {renderRoutes}
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          p: 3,
          borderTop: `1px solid ${visionColors.core.border.primary}`,
          background: "rgba(15, 20, 25, 0.6)",
        }}
      >
        {!miniSidenav && (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{
                color: visionColors.core.text.tertiary,
                fontSize: "0.75rem",
                display: "block",
                mb: 1,
              }}
            >
              Version 2.0.0
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "2px",
                background: visionColors.gradients.accent.neon,
                borderRadius: "1px",
                opacity: 0.6,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        open={!miniSidenav}
        onClose={() => setMiniSidenav(dispatch, true)}
        sx={{
          display: { xs: "none", xl: "block" },
          width: miniSidenav ? 80 : 274,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: miniSidenav ? 80 : 274,
            boxSizing: "border-box",
            background: "transparent",
            border: "none",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
        {...rest}
      >
        {sidenavContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={!miniSidenav && isMobile}
        onClose={closeSidenav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", xl: "none" },
          "& .MuiDrawer-paper": {
            width: 274,
            boxSizing: "border-box",
            background: "transparent",
            border: "none",
          },
        }}
      >
        {sidenavContent}
      </Drawer>
    </>
  );
}

// Setting default values for the props of VisionSidenav
VisionSidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the VisionSidenav
VisionSidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VisionSidenav;
