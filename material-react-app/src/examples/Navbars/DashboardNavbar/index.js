import { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Icon,
  Badge,
} from "@mui/material";
import { toast } from "react-toastify";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

import axios from "axios";
import Avatar from "@mui/material/Avatar"; 

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import { AuthContext } from "context";
import { useSocket } from "context/SocketContext/SocketContext";
import AuthService from "services/auth-service";
import "./style.css";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function DashboardNavbar({ absolute = false, light = false, isMini = false }) {
  const { t } = useTranslation();

  const socket = useSocket();
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;

  const [openMenu, setOpenMenu] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [popupNotif, setPopupNotif] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const unseenCount = notifications.filter(n => !n.seen).length;
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
const handleLanguageMenuOpen = (event) => {
  setLangAnchorEl(event.currentTarget);
};

const handleLanguageMenuClose = () => {
  setLangAnchorEl(null);
};

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  handleLanguageMenuClose();
};

  useEffect(() => {
    setNavbarType(fixedNavbar ? "sticky" : "static");


    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch("http://localhost:8080/user/notifications", {
          credentials: "include",
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Erreur lors du chargement des notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!socket || !user?._id) return;

    const notifHandler = (notif) => {
      if (notif.recipient === user._id) {
        setNotifications((prev) => [notif, ...prev]);
        setPopupNotif(notif);
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 4500);
        setTimeout(() => setPopupNotif(null), 5000);
      }
    };

    socket.on("leave_request", notifHandler);
    socket.on("new_notification", notifHandler);
    socket.on("driver_assignment", notifHandler);

    return () => {
      socket.off("new_notification", notifHandler);
      socket.off("driver_assignment", notifHandler);
      socket.off("leave_request", notifHandler);
    };
  }, [socket, user]);

  const markAsSeen = async (notifId) => {
    try {
      await axios.put(`http://localhost:8080/user/notifications/${notifId}/seen`, {}, {
        withCredentials: true,
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notifId ? { ...n, seen: true } : n))

      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la notification :", err);
    }
  };

  const deleteNotification = async (notifId) => {
    try {
      await axios.delete(`http://localhost:8080/user/notifications/${notifId}`, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.filter((n) => n._id !== notifId));
          // deleteNotification(notifId);  // supprime après succès

    } catch (error) {
      console.error("Erreur lors de la suppression de la notification :", error);
    }
  };

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
    notifications.forEach((n) => {
      if (!n.seen) markAsSeen(n._id);
    });
  };
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogOut = async () => {
    await AuthService.logout();
    authContext.logout();
    navigate("/auth/login");
  };

  const handleTripDecision = async (tripId, action, notifId) => {
    try {
      await axios.get(`http://localhost:8080/trip/validation/${tripId}?action=${action}`, {
        withCredentials: true,
      });
toast.success(t(action === "accept" ? "tripAccepted" : "tripRejected"));
      deleteNotification(notifId);
    } catch (err) {
      toast.error(t("tripError"));
    }
  };

  const handleAccept = async (token, notifId) => {
    try {
      await axios.get(`http://localhost:8080/user/validate-driver/${token}/accept`, {
        withCredentials: true,
      });
      toast.success(t("driverAccepted"));
      deleteNotification(notifId);
    } catch (error) {
      toast.error("Erreur lors de l'acceptation.");
    }
  };

  const handleRefuse = async (token, notifId) => {
    try {
      await axios.get(`http://localhost:8080/user/validate-driver/${token}/refuse`, {
        withCredentials: true,
      });
      toast.info(t("driverRejected"));
      deleteNotification(notifId);
    } catch (error) {
      toast.error("Erreur lors du refus.");
    }
  };

  const handleAcceptLeaveRequest = async (token, notifId) => {
    try {
      await axios.get(`http://localhost:8080/conge/validate/${token}/accept`, {
        withCredentials: true,
      });
      toast.success(t("leaveAccepted"));
      deleteNotification(notifId);
    } catch (error) {
      toast.error(t("leaveError"));
    }
  };

  const handleRefuseLeaveRequest = async (token, notifId) => {
    try {
      await axios.get(`http://localhost:8080/conge/validate/${token}/reject`, {
        withCredentials: true,
      });
      toast.info(t("leaveRejected"));
      deleteNotification(notifId);
    } catch (error) {
      toast.error(t("leaveError"));
    }
  };

  const renderMenu = () => (
    <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleCloseMenu} sx={{ mt: 2 }}>
      {notifications.length === 0 ? (
        <NotificationItem icon={<Icon>info</Icon>} title={t("noNotification")}  />
      ) : (
        notifications.map((notif) => (
          <div key={notif._id} style={{
            padding: "12px",
            maxWidth: "340px",
            wordBreak: "break-word",
            whiteSpace: "normal",
            fontWeight: notif.seen ? "normal" : "500",
            fontSize: "0.875rem",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            textTransform: "none",
            borderBottom: "1px solid #e0e0e0",
          }}>
            <NotificationItem
              icon={<Icon>notifications</Icon>}
              title={<span dangerouslySetInnerHTML={{ __html: notif.message }} />}
              date={new Date(notif.createdAt).toLocaleString()}
            />

            {notif.type === "account_validation" && notif.token && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <MDButton size="small" color="success" onClick={() => handleAccept(notif.token, notif._id)}>✅ {t("accept")}</MDButton>
                <MDButton size="small" color="error" onClick={() => handleRefuse(notif.token, notif._id)}>❌ {t("reject")}</MDButton>
              </div>
            )}

            {notif.type === "driver_assignment" && user?.role === "super_admin" && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <MDButton size="small" color="success" onClick={() => handleTripDecision(notif.relatedEntity, "accept", notif._id)}>✅ {t("accept")}</MDButton>
                <MDButton size="small" color="error" onClick={() => handleTripDecision(notif.relatedEntity, "refuse", notif._id)}>❌ {t("reject")}</MDButton>
              </div>
            )}

            {notif.type === "leave_request" && notif.token && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <MDButton size="small" color="success" onClick={() => handleAcceptLeaveRequest(notif.token, notif._id)}>✅ {t("accept")}</MDButton>
                <MDButton size="small" color="error" onClick={() => handleRefuseLeaveRequest(notif.token, notif._id)}>❌ {t("reject")}</MDButton>
              </div>
            )}
          </div>
        ))
      )}
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;
      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }
      return colorValue;
    },
  });

  return (
    <DashboardLayout>
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={{
        background: 'rgba(15, 20, 25, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        minHeight: '80px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #5C2DD5, #7B42F6, #00D4FF, transparent)',
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: '80px !important',
          px: 3,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <MDBox display="flex" alignItems="center" color="inherit">
          <Breadcrumbs
            icon="home"
            title={(route[route.length - 1] ?? "Dashboard").toString()}
            route={route}
            light={true}
            sx={{
              '& .MuiBreadcrumbs-ol': {
                color: '#A0AEC0',
              },
              '& .MuiBreadcrumbs-separator': {
                color: '#718096',
              },
              '& a, & span': {
                color: '#A0AEC0',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: '#00D4FF',
                },
              },
            }}
          />
        </MDBox>

        {!isMini && (
          <MDBox display="flex" alignItems="center" gap={2}>
            {/* Enhanced Search Input */}
            <MDBox sx={{ minWidth: { xs: 200, md: 300 } }}>
              <MDInput
                label={t("searchHere")}
                placeholder="Search fleet, drivers, routes..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(26, 32, 44, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    height: '44px',
                    '& fieldset': {
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover fieldset': {
                      border: '1px solid rgba(0, 212, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #00D4FF',
                      boxShadow: '0 0 0 4px rgba(0, 212, 255, 0.1)',
                    },
                    '& input': {
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      '&::placeholder': {
                        color: '#718096',
                        opacity: 1,
                      },
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#A0AEC0',
                    fontSize: '0.875rem',
                    '&.Mui-focused': {
                      color: '#00D4FF',
                    },
                  },
                  '& .MuiInputAdornment-root': {
                    color: '#A0AEC0',
                  },
                }}
              />
            </MDBox>

            {/* Action Icons */}
            <MDBox display="flex" alignItems="center" gap={1}>

              {/* Language Selector */}
              <IconButton
                size="medium"
                onClick={handleLanguageMenuOpen}
                sx={{
                  background: 'rgba(26, 32, 44, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  width: '44px',
                  height: '44px',
                  color: '#A0AEC0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    color: '#00D4FF',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Icon>language</Icon>
              </IconButton>

              {/* Notifications */}
              <IconButton
                size="medium"
                onClick={handleOpenMenu}
                sx={{
                  background: 'rgba(26, 32, 44, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  width: '44px',
                  height: '44px',
                  color: '#A0AEC0',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    color: '#00D4FF',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Badge
                  badgeContent={unseenCount > 9 ? "9+" : unseenCount}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #E31A1A, #EF5350)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '9px',
                      boxShadow: '0 0 10px rgba(227, 26, 26, 0.4)',
                    },
                  }}
                >
                  <Icon>notifications</Icon>
                </Badge>
              </IconButton>

              {/* User Profile */}
              {user ? (
                <MDBox
                  display="flex"
                  alignItems="center"
                  gap={2}
                  sx={{
                    background: 'rgba(26, 32, 44, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    p: 1,
                    pl: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                  onClick={() => navigate("/profile")}
                >
                  <MDBox>
                    <MDTypography variant="body2" color="#FFFFFF" fontWeight="600" sx={{ fontSize: '0.875rem' }}>
                      {user.FirstName} {user.LastName}
                    </MDTypography>
                    <MDTypography variant="caption" color="#718096" sx={{ fontSize: '0.75rem' }}>
                      {user.role === 'super_admin' ? 'Administrator' :
                       user.role === 'manager' ? 'Manager' : 'Driver'}
                    </MDTypography>
                  </MDBox>
                  {user.image ? (
                    <Avatar
                      src={`http://localhost:8080/uploads/${user.image}`}
                      alt={`${user.FirstName} ${user.LastName}`}
                      sx={{
                        width: 36,
                        height: 36,
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      }}
                    />
                  ) : (
                    <MDBox
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #5C2DD5, #7B42F6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <Icon sx={{ color: 'white', fontSize: 20 }}>account_circle</Icon>
                    </MDBox>
                  )}
                </MDBox>
              ) : null}

                  


              {/* Logout Button */}
              <MDButton
                variant="outlined"
                onClick={handleLogOut}
                sx={{
                  px: 3,
                  py: 1,
                  border: '2px solid rgba(227, 26, 26, 0.3)',
                  background: 'rgba(227, 26, 26, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  color: '#E31A1A',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '2px solid rgba(227, 26, 26, 0.5)',
                    background: 'rgba(227, 26, 26, 0.2)',
                    color: '#FFFFFF',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(227, 26, 26, 0.3)',
                  },
                }}
              >
                <Icon sx={{ mr: 1, fontSize: 18 }}>logout</Icon>
                {t("logout")}
              </MDButton>

              {/* Enhanced Notification Menu */}
              {renderMenu()}

              {/* Enhanced Language Menu */}
              <Menu
                anchorEl={langAnchorEl}
                open={Boolean(langAnchorEl)}
                onClose={handleLanguageMenuClose}
                sx={{
                  mt: 2,
                  '& .MuiPaper-root': {
                    background: 'rgba(26, 32, 44, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                  },
                }}
              >
                <NotificationItem
                  icon={<Icon sx={{ color: '#00D4FF' }}>flag</Icon>}
                  title={
                    <MDTypography variant="body2" color="#FFFFFF" fontWeight="500">
                      {t("french")}
                    </MDTypography>
                  }
                  onClick={() => changeLanguage("fr")}
                />
                <NotificationItem
                  icon={<Icon sx={{ color: '#00D4FF' }}>flag</Icon>}
                  title={
                    <MDTypography variant="body2" color="#FFFFFF" fontWeight="500">
                      {t("english")}
                    </MDTypography>
                  }
                  onClick={() => changeLanguage("en")}
                />
              </Menu>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>

      {popupNotif && (
        <MDBox
          className={popupVisible ? "fadein-popup" : "fadeout-popup"}
          sx={{
            position: "fixed",
            top: 100,
            right: 24,
            zIndex: 1300,
            background: 'rgba(26, 32, 44, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderLeft: '4px solid #00D4FF',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.2)',
            borderRadius: '16px',
            p: 2,
            maxWidth: '360px',
            minWidth: '300px',
          }}
        >
          <MDBox display="flex" alignItems="flex-start" gap={2}>
            <MDBox
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00D4FF, #4DDDFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon sx={{ color: 'white', fontSize: 20 }}>notifications</Icon>
            </MDBox>

            <MDBox flex={1}>
              <MDTypography
                variant="body2"
                color="#FFFFFF"
                fontWeight="500"
                sx={{
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                  mb: 1,
                }}
                dangerouslySetInnerHTML={{ __html: popupNotif.message }}
              />
              <MDTypography
                variant="caption"
                color="#718096"
                sx={{ fontSize: '0.75rem' }}
              >
                {new Date(popupNotif.createdAt).toLocaleString()}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </AppBar>
    </DashboardLayout>
  );
}

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
