/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com
=========================================================
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function SidenavCollapse({ icon, name, active = false, sx = {} }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  const ownerState = {
    active,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
    miniSidenav,
  };

  return (
    <ListItem component="li" sx={{ p: 0, mb: 1 }}>
      <MDBox
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          p: miniSidenav ? 1.5 : 2,
          mx: 2,
          borderRadius: '12px',
          background: active
            ? 'linear-gradient(135deg, rgba(92, 45, 213, 0.2), rgba(123, 66, 246, 0.2))'
            : 'transparent',
          border: active
            ? '1px solid rgba(92, 45, 213, 0.3)'
            : '1px solid transparent',
          color: active ? '#FFFFFF' : '#A0AEC0',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',

          '&:hover': {
            background: active
              ? 'linear-gradient(135deg, rgba(92, 45, 213, 0.3), rgba(123, 66, 246, 0.3))'
              : 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#FFFFFF',
            transform: 'translateX(4px)',
          },

          // Active indicator line
          ...(active && {
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #5C2DD5, #7B42F6, #00D4FF)',
              borderRadius: '0 2px 2px 0',
            },
          }),

          ...sx
        }}
      >
        {/* Icon */}
        <MDBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: miniSidenav ? 24 : 28,
            height: miniSidenav ? 24 : 28,
            borderRadius: '8px',
            background: active
              ? 'linear-gradient(135deg, #5C2DD5, #7B42F6)'
              : 'rgba(26, 32, 44, 0.6)',
            mr: miniSidenav ? 0 : 2,
            transition: 'all 0.3s ease',
            border: active ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {typeof icon === "string" ? (
            <Icon
              sx={{
                fontSize: miniSidenav ? 16 : 18,
                color: active ? '#FFFFFF' : '#A0AEC0',
                transition: 'color 0.3s ease',
              }}
            >
              {icon}
            </Icon>
          ) : (
            icon
          )}
        </MDBox>

        {/* Text */}
        {!miniSidenav && (
          <MDBox flex={1}>
            <ListItemText
              primary={name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 500,
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.025em',
                },
              }}
            />
          </MDBox>
        )}

        {/* Active indicator dot */}
        {active && !miniSidenav && (
          <MDBox
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00D4FF',
              boxShadow: '0 0 8px rgba(0, 212, 255, 0.4)',
              ml: 1,
            }}
          />
        )}
      </MDBox>
    </ListItem>
  );
}

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  sx: PropTypes.object,
};

export default SidenavCollapse;
