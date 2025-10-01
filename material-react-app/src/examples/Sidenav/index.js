import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

import { useTranslation } from "react-i18next"; // ✅ Import i18n

function Sidenav({ color = "info", brand = "", brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const { t } = useTranslation(); // ✅ Hook de traduction

  let textColor = "white";
  if (transparentSidenav || (whiteSidenav && !darkMode)) textColor = "dark";
  else if (whiteSidenav && darkMode) textColor = "inherit";

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

  const renderRoutes = routes.map(({ type, nameKey, title, icon, noCollapse, key, href, route, disabled }) => {
    if (type === "collapse") {
      const translatedName = t(`menu.${nameKey}`); // ✅ Utiliser la traduction

      const content = (
        <SidenavCollapse
          name={translatedName}
          icon={icon}
          active={key === collapseName}
          noCollapse={!!noCollapse}
          sx={disabled ? { opacity: 0.5, pointerEvents: "none" } : {}}
        />
      );

      return href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{
            textDecoration: "none",
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? "none" : "auto",
          }}
        >
          {content}
        </Link>
      ) : (
        <NavLink
          key={key}
          to={route}
          style={{
            textDecoration: "none",
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {content}
        </NavLink>
      );
    }

    if (type === "title") {
      return (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {t(`menu.${title}`)} {/* ✅ Traduction du titre */}
        </MDTypography>
      );
    }

    if (type === "divider") {
      return (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return null;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={4} pb={3} px={3} textAlign="center" position="relative">
        {/* Close Button for Mobile */}
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={12}
          right={12}
          p={1}
          onClick={closeSidenav}
          sx={{
            cursor: "pointer",
            background: 'rgba(26, 32, 44, 0.6)',
            borderRadius: '8px',
            '&:hover': {
              background: 'rgba(227, 26, 26, 0.2)',
            },
          }}
        >
          <Icon sx={{ color: '#A0AEC0', fontSize: 20 }}>close</Icon>
        </MDBox>

        {/* Logo Section */}
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={miniSidenav ? "column" : "row"}
          gap={miniSidenav ? 1 : 2}
          sx={{
            textDecoration: 'none',
            p: 2,
            borderRadius: '16px',
            background: 'rgba(26, 32, 44, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(92, 45, 213, 0.1)',
              border: '1px solid rgba(92, 45, 213, 0.3)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {brand ? (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width={miniSidenav ? "2rem" : "2.5rem"}
              height={miniSidenav ? "2rem" : "2.5rem"}
              sx={{
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <MDBox
              sx={{
                width: miniSidenav ? 32 : 40,
                height: miniSidenav ? 32 : 40,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #5C2DD5, #7B42F6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(92, 45, 213, 0.3)',
              }}
            >
              <Icon sx={{ color: 'white', fontSize: miniSidenav ? 20 : 24 }}>local_shipping</Icon>
            </MDBox>
          )}

          {!miniSidenav && (
            <MDBox textAlign="left">
              <MDTypography
                variant="h6"
                fontWeight="700"
                sx={{
                  color: '#FFFFFF',
                  fontSize: '1.1rem',
                  lineHeight: 1.2,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #00D4FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {brandName || "Fleet Pro"}
              </MDTypography>
              <MDTypography
                variant="caption"
                color="#718096"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  display: 'block',
                  mt: 0.5,
                }}
              >
                Dashboard
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>

      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />

      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
