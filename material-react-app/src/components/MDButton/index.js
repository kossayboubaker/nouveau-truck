/**
=========================================================
* Material Dashboard 2 PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDButton
import MDButtonRoot from "components/MDButton/MDButtonRoot";
import VisionButtonRoot from "components/MDButton/VisionButtonRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

const MDButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, useVision = true, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const ButtonComponent = useVision ? VisionButtonRoot : MDButtonRoot;

    return (
      <ButtonComponent
        {...rest}
        ref={ref}
        color={color}
        variant={variant === "gradient" ? "gradient" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </ButtonComponent>
    );
  }
);

// Setting default values for the props of MDButton
MDButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "primary",
  circular: false,
  iconOnly: false,
  useVision: true,
};

// Typechecking props for the MDButton
MDButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  useVision: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDButton;
