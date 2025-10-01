/**
=========================================================
* Modern Dashboard - Inspired by Premium UI Designs
=========================================================
* Beautiful gradient background with glassmorphism effects
* Inspired by the provided dashboard screenshots
*/

// @mui material components
import Grid from "@mui/material/Grid";
import { Box, Typography, Card, Avatar, LinearProgress, Chip, IconButton } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import VisionDashboardLayout from "examples/LayoutContainers/VisionDashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import VisionStatCard from "examples/Cards/StatisticsCards/VisionStatCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RouteIcon from '@mui/icons-material/Route';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Premium Stat Card Component inspired by the screenshots
const PremiumStatCard = ({ icon: Icon, title, value, percentage, trend, gradient, shadowColor }) => (
  <Card
    sx={{
      background: `linear-gradient(135deg, ${gradient})`,
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      p: 3,
      height: '160px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 25px 50px ${shadowColor}`,
        border: '1px solid rgba(255, 255, 255, 0.3)',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
      }
    }}
  >
    <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Avatar
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            width: 56,
            height: 56,
          }}
        >
          <Icon sx={{ color: '#ffffff', fontSize: 28 }} />
        </Avatar>
        <IconButton
          size="small"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': { 
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff'
            }
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Typography
        variant="h3"
        sx={{
          color: '#ffffff',
          fontWeight: 800,
          mb: 1,
          fontSize: '2.2rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {value}
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: 600,
          mb: 1,
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Chip
          label={percentage}
          size="small"
          sx={{
            background: trend === 'up' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 107, 107, 0.2)',
            color: trend === 'up' ? '#00ff88' : '#ff6b6b',
            border: trend === 'up' ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid rgba(255, 107, 107, 0.3)',
            fontSize: '0.75rem',
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
          }}
        />
      </Box>
    </Box>
  </Card>
);

// Premium Chart Card inspired by the screenshots
const PremiumChartCard = ({ title, subtitle, children, gradient, icon: Icon }) => (
  <Card
    sx={{
      background: 'rgba(15, 20, 30, 0.8)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      p: 3,
      height: '420px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid rgba(139, 92, 246, 0.3)',
        background: 'rgba(15, 20, 30, 0.9)',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: gradient,
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Avatar
        sx={{
          background: 'rgba(139, 92, 246, 0.2)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          width: 48,
          height: 48,
          mr: 2,
        }}
      >
        <Icon sx={{ color: '#8b5cf6', fontSize: 24 }} />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      <IconButton
        size="small"
        sx={{
          color: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { 
            color: '#8b5cf6',
            background: 'rgba(139, 92, 246, 0.1)' 
          }
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
    <Box sx={{ height: 'calc(100% - 100px)' }}>
      {children}
    </Box>
  </Card>
);

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <>
      {/* Premium Background inspired by the screenshots */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1a0d2e 0%, #0f0f23 25%, #16213e 50%, #0a0e27 75%, #1a0d2e 100%)',
          zIndex: -10,
        }}
      />

      {/* Floating gradient orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -5,
        }}
      >
        {/* Purple orb */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-300px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
              '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
              '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
            },
          }}
        />
        
        {/* Cyan orb */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '-300px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        
        {/* Pink orb */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite',
          }}
        />
      </Box>

      <VisionDashboardLayout>
        <DashboardNavbar />
        
        {/* Hero Section inspired by the screenshots */}
        <MDBox mb={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(0, 212, 255, 0.1) 100%)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '28px',
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #00d4ff, #8b5cf6)',
                backgroundSize: '300% 100%',
                animation: 'gradientMove 3s ease infinite',
                '@keyframes gradientMove': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              }
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(135deg, #ffffff 0%, #8b5cf6 50%, #00d4ff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  Transport Management Hub
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 400,
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  Advanced analytics and real-time monitoring for your fleet operations
                </Typography>
                
                <Grid container spacing={3}>
                  {[
                    { value: '98.7%', label: 'System Uptime', color: '#00ff88' },
                    { value: '24/7', label: 'Live Support', color: '#00d4ff' },
                    { value: '500+', label: 'Active Fleets', color: '#8b5cf6' },
                    { value: '€2.8M', label: 'Revenue', color: '#ec4899' },
                  ].map((stat, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: stat.color,
                            fontWeight: 800,
                            textShadow: `0 0 20px ${stat.color}50`,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(0, 212, 255, 0.2))',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <SpeedIcon sx={{ fontSize: 60, color: '#ffffff' }} />
                  </Avatar>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </MDBox>

        {/* Premium Stats Cards inspired by the screenshots */}
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <PremiumStatCard
                icon={LocalShippingIcon}
                title="Active Vehicles"
                value="284"
                percentage="+12.5%"
                trend="up"
                gradient="rgba(255, 159, 64, 0.2), rgba(255, 99, 132, 0.15)"
                shadowColor="rgba(255, 159, 64, 0.3)"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <PremiumStatCard
                icon={RouteIcon}
                title="Routes Today"
                value="2,481"
                percentage="+8.2%"
                trend="up"
                gradient="rgba(54, 162, 235, 0.2), rgba(0, 212, 255, 0.15)"
                shadowColor="rgba(0, 212, 255, 0.3)"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <PremiumStatCard
                icon={AttachMoneyIcon}
                title="Revenue"
                value="$31,124"
                percentage="+15.8%"
                trend="up"
                gradient="rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15)"
                shadowColor="rgba(139, 92, 246, 0.3)"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <PremiumStatCard
                icon={PeopleIcon}
                title="Active Drivers"
                value="2,125"
                percentage="+3.1%"
                trend="up"
                gradient="rgba(75, 192, 192, 0.2), rgba(0, 255, 136, 0.15)"
                shadowColor="rgba(0, 255, 136, 0.3)"
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* Premium Charts Section */}
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <PremiumChartCard
                title="Fleet Performance Analytics"
                subtitle="Real-time monitoring and efficiency metrics"
                gradient="linear-gradient(90deg, #8b5cf6, #ec4899, #00d4ff)"
                icon={TrendingUpIcon}
              >
                <Box sx={{ height: '300px', mt: 2 }}>
                  <ReportsLineChart
                    color="info"
                    title=""
                    description=""
                    date=""
                    chart={sales}
                  />
                </Box>
              </PremiumChartCard>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <PremiumChartCard
                title="Route Efficiency"
                subtitle="Optimization insights"
                gradient="linear-gradient(90deg, #ec4899, #8b5cf6)"
                icon={RouteIcon}
              >
                <Box sx={{ height: '300px', mt: 2 }}>
                  <ReportsBarChart
                    color="secondary"
                    title=""
                    description=""
                    date=""
                    chart={reportsBarChartData}
                  />
                </Box>
              </PremiumChartCard>
            </Grid>
          </Grid>
        </MDBox>

        {/* Bottom Section */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <PremiumChartCard
                title="Operations Overview"
                subtitle="Comprehensive fleet management insights"
                gradient="linear-gradient(90deg, #00d4ff, #8b5cf6)"
                icon={AssessmentIcon}
              >
                <Projects />
              </PremiumChartCard>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PremiumChartCard
                title="Recent Activities"
                subtitle="Live updates and notifications"
                gradient="linear-gradient(90deg, #8b5cf6, #00ff88)"
                icon={NotificationsIcon}
              >
                <OrdersOverview />
              </PremiumChartCard>
            </Grid>
          </Grid>
        </MDBox>

        <Footer />
      </VisionDashboardLayout>
    </>
  );
}

export default Dashboard;
