/**
 * Vision UI Dashboard Dark Theme
 * Premium dark theme with glass morphism and neon accents
 */

import { createTheme } from "@mui/material/styles";

// Import base styles
import colors from "assets/theme/base/colors";
import breakpoints from "assets/theme/base/breakpoints";
import typography from "assets/theme/base/typography";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";
import globals from "assets/theme/base/globals";

// Import functions
import boxShadow from "assets/theme/functions/boxShadow";
import hexToRgb from "assets/theme/functions/hexToRgb";
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

// Import component styles
import sidenav from "assets/theme/components/sidenav";
import list from "assets/theme/components/list";
import listItem from "assets/theme/components/list/listItem";
import listItemText from "assets/theme/components/list/listItemText";
import card from "assets/theme/components/card";
import cardMedia from "assets/theme/components/card/cardMedia";
import cardContent from "assets/theme/components/card/cardContent";
import button from "assets/theme/components/button";
import iconButton from "assets/theme/components/iconButton";
import input from "assets/theme/components/form/input";
import inputLabel from "assets/theme/components/form/inputLabel";
import inputOutlined from "assets/theme/components/form/inputOutlined";
import textField from "assets/theme/components/form/textField";
import menu from "assets/theme/components/menu";
import menuItem from "assets/theme/components/menu/menuItem";
import switchButton from "assets/theme/components/form/switchButton";
import divider from "assets/theme/components/divider";
import tableContainer from "assets/theme/components/table/tableContainer";
import tableHead from "assets/theme/components/table/tableHead";
import tableCell from "assets/theme/components/table/tableCell";
import linearProgress from "assets/theme/components/linearProgress";
import breadcrumbs from "assets/theme/components/breadcrumbs";
import slider from "assets/theme/components/slider";
import avatar from "assets/theme/components/avatar";
import tooltip from "assets/theme/components/tooltip";
import appBar from "assets/theme/components/appBar";
import tabs from "assets/theme/components/tabs";
import tab from "assets/theme/components/tabs/tab";
import stepper from "assets/theme/components/stepper";
import step from "assets/theme/components/stepper/step";
import stepConnector from "assets/theme/components/stepper/stepConnector";
import stepLabel from "assets/theme/components/stepper/stepLabel";
import stepIcon from "assets/theme/components/stepper/stepIcon";
import select from "assets/theme/components/form/select";
import formControlLabel from "assets/theme/components/form/formControlLabel";
import formLabel from "assets/theme/components/form/formLabel";
import checkbox from "assets/theme/components/form/checkbox";
import radio from "assets/theme/components/form/radio";
import autocomplete from "assets/theme/components/form/autocomplete";
import container from "assets/theme/components/container";
import popover from "assets/theme/components/popover";
import buttonBase from "assets/theme/components/buttonBase";
import icon from "assets/theme/components/icon";
import svgIcon from "assets/theme/components/svgIcon";
import link from "assets/theme/components/link";
import dialog from "assets/theme/components/dialog";
import dialogTitle from "assets/theme/components/dialog/dialogTitle";
import dialogContent from "assets/theme/components/dialog/dialogContent";
import dialogContentText from "assets/theme/components/dialog/dialogContentText";
import dialogActions from "assets/theme/components/dialog/dialogActions";

export default createTheme({
  palette: {
    mode: 'dark',
    ...colors,
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.main,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
  },
  breakpoints: { ...breakpoints },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    
    // Enhanced Card component for glass morphism
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 32, 44, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: boxShadows.glass,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: boxShadows.glassHover,
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    // Enhanced Button component
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: colors.gradients.visionPrimary.main,
          border: 'none',
          boxShadow: boxShadows.neonBlue,
          '&:hover': {
            background: colors.gradients.visionPrimary.state,
            boxShadow: boxShadows.neonPurple,
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: colors.gradients.secondary.main,
          border: 'none',
          boxShadow: boxShadows.neonPurple,
          '&:hover': {
            background: colors.gradients.secondary.state,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          border: '2px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            border: '2px solid rgba(0, 212, 255, 0.5)',
            background: 'rgba(0, 212, 255, 0.1)',
            boxShadow: boxShadows.neonCyan,
          },
        },
      },
    },

    // Enhanced TextField/Input components
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(26, 32, 44, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
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
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            '&.Mui-focused': {
              color: '#00D4FF',
            },
          },
        },
      },
    },

    // Enhanced AppBar/Navbar
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 20, 25, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: boxShadows.glass,
        },
      },
    },

    // Enhanced Drawer/Sidebar
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 20, 25, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: boxShadows.xl,
        },
      },
    },

    // Enhanced Table components
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 32, 44, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: 'rgba(30, 42, 120, 0.3)',
            color: colors.text.main,
            fontWeight: 600,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: colors.text.main,
        },
      },
    },

    // All other components use existing styles
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
