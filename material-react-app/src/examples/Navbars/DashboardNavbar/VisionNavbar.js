/**
 * Vision UI Dashboard Navbar
 * Enhanced navbar with glassmorphism and modern design
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  Typography,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Translation
import { useTranslation } from "react-i18next";

// Vision UI colors
import visionColors from "assets/theme/base/visionColors";

function VisionNavbar({ absolute, light, isMini, ...rest }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const route = useLocation().pathname.split("/").slice(1);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/auth/login");
    handleCloseMenu();
  };

  // Profile handler
  const handleProfile = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  // Settings handler
  const handleSettings = () => {
    navigate("/settings");
    handleCloseMenu();
  };

  // Create breadcrumbs
  const createBreadcrumbs = () => {
    const breadcrumbs = [
      <Link
        key="home"
        color="inherit"
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          color: visionColors.core.text.secondary,
          textDecoration: "none",
          "&:hover": {
            color: visionColors.accent.neon.cyan,
          },
        }}
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: "16px" }} />
        Home
      </Link>,
    ];

    route.forEach((path, index) => {
      const routePath = `/${route.slice(0, index + 1).join("/")}`;
      const isLast = index === route.length - 1;
      
      breadcrumbs.push(
        isLast ? (
          <Typography
            key={path}
            sx={{
              color: visionColors.core.text.primary,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {path.replace(/-/g, " ")}
          </Typography>
        ) : (
          <Link
            key={path}
            color="inherit"
            href={routePath}
            sx={{
              color: visionColors.core.text.secondary,
              textDecoration: "none",
              textTransform: "capitalize",
              "&:hover": {
                color: visionColors.accent.neon.cyan,
              },
            }}
          >
            {path.replace(/-/g, " ")}
          </Link>
        )
      );
    });

    return breadcrumbs;
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={{
        background: transparentNavbar
          ? "transparent"
          : visionColors.components.card.background,
        backdropFilter: transparentNavbar ? "none" : "blur(20px)",
        boxShadow: transparentNavbar
          ? "none"
          : visionColors.shadows.glass.medium,
        border: transparentNavbar
          ? "none"
          : `1px solid ${visionColors.components.card.border}`,
        borderRadius: transparentNavbar ? "0" : "0 0 20px 20px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1100,
        left: { xs: 0, xl: miniSidenav ? 80 : 274 },
        width: {
          xs: "100%",
          xl: `calc(100% - ${miniSidenav ? 80 : 274}px)`,
        },
      }}
      {...rest}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Left side - Menu button and Breadcrumbs */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <IconButton
            sx={{
              color: visionColors.core.text.secondary,
              mr: 2,
              p: 1,
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(0, 212, 255, 0.1)",
                color: visionColors.accent.neon.cyan,
                boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}`,
              },
            }}
            onClick={handleMiniSidenav}
          >
            <MenuIcon />
          </IconButton>

          <Breadcrumbs
            separator={
              <NavigateNextIcon
                sx={{
                  fontSize: "16px",
                  color: visionColors.core.text.tertiary,
                }}
              />
            }
            sx={{
              display: { xs: "none", md: "flex" },
              "& .MuiBreadcrumbs-ol": {
                alignItems: "center",
              },
            }}
          >
            {createBreadcrumbs()}
          </Breadcrumbs>
        </Box>

        {/* Right side - Icons and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Dark Mode Toggle */}
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton
              sx={{
                color: visionColors.core.text.secondary,
                p: 1,
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(0, 212, 255, 0.1)",
                  color: visionColors.accent.neon.cyan,
                },
              }}
              onClick={handleConfiguratorOpen}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                color: visionColors.core.text.secondary,
                p: 1,
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(0, 212, 255, 0.1)",
                  color: visionColors.accent.neon.cyan,
                },
              }}
            >
              <Badge
                badgeContent={notifications.length}
                sx={{
                  "& .MuiBadge-badge": {
                    background: visionColors.gradients.accent.neon,
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    minWidth: "18px",
                    height: "18px",
                    boxShadow: `0 0 10px ${visionColors.accent.glow.cyan}`,
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleOpenMenu}
              sx={{
                p: 0.5,
                borderRadius: "12px",
                border: `2px solid ${visionColors.core.border.primary}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  border: `2px solid ${visionColors.accent.neon.cyan}`,
                  boxShadow: `0 0 20px ${visionColors.accent.glow.cyan}`,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: visionColors.gradients.accent.neon,
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Profile Menu Dropdown */}
          <Menu
            anchorEl={openMenu}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                background: visionColors.components.card.background,
                backdropFilter: "blur(20px)",
                border: `1px solid ${visionColors.components.card.border}`,
                borderRadius: "16px",
                boxShadow: visionColors.shadows.glass.large,
                mt: 1.5,
                minWidth: 200,
                "& .MuiMenuItem-root": {
                  borderRadius: "8px",
                  mx: 1,
                  my: 0.5,
                  color: visionColors.core.text.secondary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(0, 212, 255, 0.1)",
                    color: visionColors.accent.neon.cyan,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: visionColors.core.text.secondary }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            
            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: visionColors.core.text.secondary }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            
            <Divider sx={{ my: 1, background: visionColors.core.border.primary }} />
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: visionColors.status.error.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                sx={{ color: visionColors.status.error.main }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of VisionNavbar
VisionNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the VisionNavbar
VisionNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default VisionNavbar;
