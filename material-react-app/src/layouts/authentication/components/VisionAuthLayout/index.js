/**
 * Premium Vision UI Authentication Layout
 * Inspired by modern dashboard designs with stunning gradients
 */

import PropTypes from "prop-types";
import { Box, Container, Grid, Typography, Avatar, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function VisionAuthLayout({ children }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const getPageTitle = () => {
    if (pathname.includes('/login')) return t("form3.signIn") || "Welcome Back";
    if (pathname.includes('/register')) return t("signUp") || "Create Account";
    if (pathname.includes('/forgot-password')) return t("forgotPassword") || "Reset Password";
    if (pathname.includes('/reset-password')) return t("resetPassword") || "New Password";
    return "Authentication";
  };

  const getPageDescription = () => {
    if (pathname.includes('/login')) return "Sign in to access your fleet management dashboard";
    if (pathname.includes('/register')) return "Join thousands of fleet managers worldwide";
    if (pathname.includes('/forgot-password')) return "We'll send you a secure reset link";
    if (pathname.includes('/reset-password')) return "Create a strong, secure password";
    return "Secure access to your transport management system";
  };

  const features = [
    { icon: SecurityIcon, title: 'Enterprise Security', desc: 'Bank-level encryption' },
    { icon: SpeedIcon, title: 'Real-time Analytics', desc: 'Live fleet monitoring' },
    { icon: VerifiedUserIcon, title: 'Compliance Ready', desc: 'Industry standards' },
    { icon: SupportAgentIcon, title: '24/7 Support', desc: 'Expert assistance' },
  ];

  return (
    <PageLayout>
      {/* Premium Background inspired by screenshots */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(135deg, #1a0d2e 0%, #0f0f23 25%, #16213e 50%, #0a0e27 75%, #1a0d2e 100%)',
          zIndex: -10,
        }}
      />

      {/* Animated gradient orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -5,
          overflow: 'hidden',
        }}
      >
        {/* Purple gradient orb */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '-250px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
            animation: 'premiumFloat 20s ease-in-out infinite',
            '@keyframes premiumFloat': {
              '0%, 100%': { 
                transform: 'translate(0, 0) rotate(0deg) scale(1)' 
              },
              '33%': { 
                transform: 'translate(20px, -30px) rotate(120deg) scale(1.1)' 
              },
              '66%': { 
                transform: 'translate(-15px, 25px) rotate(240deg) scale(0.9)' 
              },
            },
          }}
        />
        
        {/* Cyan gradient orb */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '-200px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
            animation: 'premiumFloat 25s ease-in-out infinite reverse',
          }}
        />
        
        {/* Pink accent orb */}
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '70%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)',
            animation: 'premiumFloat 30s ease-in-out infinite',
          }}
        />

        {/* Grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.4,
          }}
        />
      </Box>

      {/* Content Container */}
      <Container
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid container spacing={{ xs: 3, lg: 6 }} alignItems="center" justifyContent="center">
          {/* Left Side - Premium Branding */}
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <MDBox sx={{ pr: { lg: 4, xl: 6 } }}>
              {/* Main Title with premium gradient */}
              <Typography
                variant="h1"
                className="premium-title"
                sx={{
                  mb: 3,
                  fontSize: { lg: '3.5rem', xl: '4rem' },
                  lineHeight: 1.1,
                  fontWeight: 900,
                }}
              >
                Fleet Management
                <Box component="span" sx={{ display: 'block', color: 'rgba(255,255,255,0.8)' }}>
                  Revolution
                </Box>
              </Typography>
              
              <Typography
                variant="h5"
                className="premium-subtitle"
                sx={{
                  mb: 4,
                  fontSize: { lg: '1.25rem', xl: '1.5rem' },
                  lineHeight: 1.6,
                }}
              >
                Experience the future of logistics with our AI-powered platform that transforms 
                how you manage, track, and optimize your fleet operations.
              </Typography>

              {/* Feature Grid */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mb: 2,
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}
                      >
                        <feature.icon sx={{ color: '#8b5cf6', fontSize: 24 }} />
                      </Avatar>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1rem',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.875rem',
                        }}
                      >
                        {feature.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Premium Stats */}
              <Box sx={{ display: 'flex', gap: 4 }}>
                {[
                  { number: '99.9%', label: 'Uptime', color: '#00ff88' },
                  { number: '2M+', label: 'Vehicles', color: '#00d4ff' },
                  { number: '150+', label: 'Countries', color: '#8b5cf6' },
                ].map((stat, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        color: stat.color,
                        fontWeight: 800,
                        mb: 1,
                        textShadow: `0 0 20px ${stat.color}50`,
                        fontSize: { lg: '2.5rem', xl: '3rem' },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Trust Badges */}
              <Box sx={{ mt: 5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {['ISO 27001', 'SOC 2', 'GDPR Ready', 'Enterprise'].map((badge, index) => (
                  <Chip
                    key={index}
                    label={badge}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      '&:hover': {
                        background: 'rgba(139, 92, 246, 0.2)',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                      },
                    }}
                  />
                ))}
              </Box>
            </MDBox>
          </Grid>

          {/* Right Side - Authentication Form */}
          <Grid item xs={12} lg={6}>
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: '80vh', lg: 'auto' },
              }}
            >
              {/* Mobile/Tablet Title */}
              <Box sx={{ display: { xs: 'block', lg: 'none' }, textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h3"
                  className="premium-title"
                  sx={{
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                  }}
                >
                  {getPageTitle()}
                </Typography>
                <Typography
                  variant="h6"
                  className="premium-subtitle"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
                  {getPageDescription()}
                </Typography>
              </Box>

              {/* Premium Auth Card */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '480px', lg: '520px' },
                  background: 'rgba(15, 20, 30, 0.8)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: { xs: '20px', sm: '28px' },
                  p: { xs: 3, sm: 4, md: 5 },
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #00d4ff, #8b5cf6)',
                    backgroundSize: '300% 100%',
                    animation: 'gradientMove 3s ease infinite',
                    '@keyframes gradientMove': {
                      '0%, 100%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 0,
                  },
                }}
              >
                {/* Desktop Title */}
                <Box sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.75rem',
                    }}
                  >
                    {getPageTitle()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1rem',
                    }}
                  >
                    {getPageDescription()}
                  </Typography>
                </Box>

                {/* Form Content */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {children}
                </Box>
              </Box>

              {/* Security Notice */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ color: '#00ff88', mr: 1, fontSize: 20 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    256-bit SSL Encrypted • SOC 2 Compliant • GDPR Ready
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem',
                  }}
                >
                  Your data is protected with enterprise-grade security
                </Typography>
              </Box>
            </MDBox>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

VisionAuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VisionAuthLayout;
