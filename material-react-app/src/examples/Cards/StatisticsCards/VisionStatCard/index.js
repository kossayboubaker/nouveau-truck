/**
 * Vision UI Statistics Card
 * Enhanced card component with glassmorphism and neon effects
 */

import PropTypes from "prop-types";
import { Card, Box, Icon, alpha } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function VisionStatCard({
  color = "primary",
  title = "",
  count = 0,
  percentage = {
    color: "success",
    amount: "",
    label: "",
  },
  icon,
  gradientColors = null,
}) {
  // Define color mappings for Vision UI theme
  const colorMappings = {
    primary: {
      gradient: 'linear-gradient(135deg, #1E2A78 0%, #3F51B5 100%)',
      glow: 'rgba(30, 42, 120, 0.4)',
      iconColor: '#FFFFFF',
    },
    secondary: {
      gradient: 'linear-gradient(135deg, #5C2DD5 0%, #7B42F6 100%)',
      glow: 'rgba(92, 45, 213, 0.4)',
      iconColor: '#FFFFFF',
    },
    info: {
      gradient: 'linear-gradient(135deg, #00D4FF 0%, #4DDDFF 100%)',
      glow: 'rgba(0, 212, 255, 0.4)',
      iconColor: '#000000',
    },
    success: {
      gradient: 'linear-gradient(135deg, #01B574 0%, #34C88A 100%)',
      glow: 'rgba(1, 181, 116, 0.4)',
      iconColor: '#FFFFFF',
    },
    warning: {
      gradient: 'linear-gradient(135deg, #FFB547 0%, #FFC56B 100%)',
      glow: 'rgba(255, 181, 71, 0.4)',
      iconColor: '#000000',
    },
    error: {
      gradient: 'linear-gradient(135deg, #E31A1A 0%, #EF5350 100%)',
      glow: 'rgba(227, 26, 26, 0.4)',
      iconColor: '#FFFFFF',
    },
    dark: {
      gradient: 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)',
      glow: 'rgba(45, 55, 72, 0.4)',
      iconColor: '#FFFFFF',
    },
  };

  const colorScheme = gradientColors || colorMappings[color] || colorMappings.primary;

  const getPercentageColor = (percentageColor) => {
    const percentageColors = {
      success: '#01B574',
      error: '#E31A1A',
      warning: '#FFB547',
      info: '#00D4FF',
      primary: '#3F51B5',
      secondary: '#7B42F6',
    };
    return percentageColors[percentageColor] || '#01B574';
  };

  const isPositive = percentage.amount.toString().includes('+');
  const isNegative = percentage.amount.toString().includes('-');

  return (
    <Card
      sx={{
        background: 'rgba(26, 32, 44, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${colorScheme.glow}`,
          border: `1px solid ${alpha(colorScheme.glow, 0.3)}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: colorScheme.gradient,
          zIndex: 1,
        },
      }}
    >
      <MDBox p={3}>
        {/* Header Section with Icon and Title */}
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox>
            <MDTypography 
              variant="body2" 
              color="#A0AEC0" 
              fontWeight="500"
              sx={{ 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.75rem',
                mb: 1,
              }}
            >
              {title}
            </MDTypography>
            <MDTypography 
              variant="h3" 
              color="white" 
              fontWeight="700"
              sx={{
                fontSize: { xs: '1.75rem', md: '2rem' },
                lineHeight: 1.2,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {count}
            </MDTypography>
          </MDBox>

          {/* Icon Container */}
          <Box
            sx={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: colorScheme.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 25px ${colorScheme.glow}, 0 0 20px ${alpha(colorScheme.glow, 0.3)}`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                padding: '2px',
                background: `linear-gradient(135deg, transparent, ${alpha('#FFFFFF', 0.2)})`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
              },
            }}
          >
            <Icon 
              sx={{ 
                fontSize: '24px',
                color: colorScheme.iconColor,
                filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`,
              }}
            >
              {icon}
            </Icon>
          </Box>
        </MDBox>

        {/* Percentage/Change Section */}
        {percentage.amount && (
          <MDBox 
            display="flex" 
            alignItems="center" 
            mt={2}
            p={2}
            sx={{
              background: 'rgba(15, 20, 25, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Box
              sx={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: getPercentageColor(percentage.color),
                boxShadow: `0 0 10px ${getPercentageColor(percentage.color)}`,
                mr: 2,
                animation: isPositive ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                  '50%': {
                    opacity: 0.7,
                    transform: 'scale(1.2)',
                  },
                },
              }}
            />
            <MDTypography 
              variant="body2" 
              fontWeight="600"
              sx={{
                color: getPercentageColor(percentage.color),
                mr: 1,
                fontSize: '0.875rem',
              }}
            >
              {percentage.amount}
            </MDTypography>
            <MDTypography 
              variant="body2" 
              color="#CBD5E0"
              fontWeight="500"
              sx={{ fontSize: '0.875rem' }}
            >
              {percentage.label}
            </MDTypography>
            
            {/* Trend Arrow */}
            {(isPositive || isNegative) && (
              <Icon
                sx={{
                  ml: 'auto',
                  fontSize: '16px',
                  color: getPercentageColor(percentage.color),
                  transform: isNegative ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                trending_up
              </Icon>
            )}
          </MDBox>
        )}

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(colorScheme.glow, 0.1)} 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </MDBox>
    </Card>
  );
}

VisionStatCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
  gradientColors: PropTypes.object,
};

export default VisionStatCard;
