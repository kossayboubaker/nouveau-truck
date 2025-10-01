/**
=========================================================
* Professional Manager Dashboard - Transport Management
=========================================================
* Modern responsive dashboard with glassmorphism design
* Optimized for manager-level operations and analytics
*/

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography, Card, Avatar, LinearProgress, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Chart components
import TripsBarChartManager from "examples/Charts/BarCharts/ReportsBarChart/ManagerReport";
import ConsumptionCostChartManager from "examples/Charts/LineCharts/ReportsLineChart/reportLigneManager";
import FuelCostStatCardManager from "examples/Cards/StatisticsCards/CostManager";
import RolePieChart from "layouts/dashboard/components/Projects/PieChartDriver";
import DriverPerformanceStats from "layouts/dashboard/components/Projects/DrivePerformance";

// Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// API
import axios from "axios";

// Modern Stat Card Component for Manager Dashboard
const ManagerStatCard = ({ icon: Icon, title, value, subtitle, color, trend, isLoading }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '18px',
        p: 3,
        height: '160px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 25px 50px rgba(${color}, 0.25)`,
          border: `1px solid rgba(${color}, 0.4)`,
          background: 'rgba(255, 255, 255, 0.05)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, rgb(${color}), rgba(${color}, 0.6))`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '4px',
          height: '100%',
          background: `linear-gradient(180deg, rgb(${color}), rgba(${color}, 0.3))`,
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Avatar
          sx={{
            background: `linear-gradient(135deg, rgba(${color}, 0.25), rgba(${color}, 0.1))`,
            border: `2px solid rgba(${color}, 0.3)`,
            width: 56,
            height: 56,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Icon sx={{ color: `rgb(${color})`, fontSize: 28 }} />
        </Avatar>
        <IconButton
          size="small"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': { 
              color: `rgb(${color})`,
              background: `rgba(${color}, 0.1)` 
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
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {isLoading ? '...' : value}
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: 600,
          mb: 0.5,
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 500,
        }}
      >
        {subtitle}
      </Typography>
    </Card>
  </motion.div>
);

// Modern Chart Container
const ManagerChartCard = ({ title, subtitle, children, color, icon: Icon, height = '420px' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        p: 3,
        height,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          border: `1px solid rgba(${color}, 0.4)`,
          background: 'rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{
            background: `linear-gradient(135deg, rgba(${color}, 0.25), rgba(${color}, 0.1))`,
            border: `2px solid rgba(${color}, 0.3)`,
            width: 48,
            height: 48,
            mr: 2,
          }}
        >
          <Icon sx={{ color: `rgb(${color})`, fontSize: 24 }} />
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
              color: `rgb(${color})`,
              background: `rgba(${color}, 0.1)` 
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
  </motion.div>
);

function ManagerDashboard() {
  const [totalTrucks, setTotalTrucks] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [truckStatusCounts, setTruckStatusCounts] = useState({
    in_service: 0,
    out_of_service: 0,
    under_maintenance: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      try {
        const [truckRes, tripRes, statusRes] = await Promise.all([
          axios.get("/statistic/stats/total-trucks", {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          axios.get("/statistic/stats/total-trips", {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          axios.get("/statistic/camions/status", {
            headers: { Authorization: localStorage.getItem("token") },
          }),
        ]);
        
        const statusCounts = statusRes.data.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});

        setTruckStatusCounts(statusCounts);
        setTotalTrucks(truckRes.data.totalTrucks);
        setTotalTrips(tripRes.data.totalTrips);
      } catch (error) {
        console.error("Erreur lors du chargement des stats :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <DashboardLayout>
      <MDBox 
        sx={{ 
          py: 2,
          height: 'calc(100vh - 140px)',
          overflow: 'hidden',
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MDBox mb={3}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(25, 30, 40, 0.95) 0%, rgba(35, 40, 55, 0.9) 100%)',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                p: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #4fc3f7, #29b6f6, #0288d1, #0277bd)',
                }
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 1,
                      background: 'linear-gradient(135deg, #ffffff 0%, #4fc3f7 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Manager Operations Center
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                      mb: 2
                    }}
                  >
                    Fleet management and operational insights dashboard
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4fc3f7', fontWeight: 700 }}>
                          {Math.round((truckStatusCounts.in_service / totalTrucks) * 100) || 0}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Fleet Active
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#29b6f6', fontWeight: 700 }}>
                          24/7
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Operations
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#0288d1', fontWeight: 700 }}>
                          {totalTrips}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Total Routes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#0277bd', fontWeight: 700 }}>
                          Live
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Tracking
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '120px',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        background: 'linear-gradient(135deg, rgba(79, 195, 247, 0.3), rgba(41, 182, 246, 0.1))',
                        border: '3px solid rgba(79, 195, 247, 0.4)',
                      }}
                    >
                      <AssessmentIcon sx={{ fontSize: 40, color: '#4fc3f7' }} />
                    </Avatar>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
        </motion.div>

        {/* Statistics Cards */}
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <ManagerStatCard
                icon={LocalShippingIcon}
                title="Total Fleet"
                value={totalTrucks}
                subtitle="Active vehicles"
                color="79, 195, 247"
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ManagerStatCard
                icon={CheckCircleIcon}
                title="In Service"
                value={truckStatusCounts.in_service || 0}
                subtitle="Operational vehicles"
                color="76, 175, 80"
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ManagerStatCard
                icon={BlockIcon}
                title="Out of Service"
                value={truckStatusCounts.out_of_service || 0}
                subtitle="Unavailable vehicles"
                color="244, 67, 54"
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ManagerStatCard
                icon={BuildIcon}
                title="Maintenance"
                value={truckStatusCounts.under_maintenance || 0}
                subtitle="Under repair"
                color="255, 152, 0"
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* Charts Section */}
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <ManagerChartCard
                title="Trip Analytics"
                subtitle="Route performance metrics"
                color="79, 195, 247"
                icon={TrendingUpIcon}
                height="380px"
              >
                <TripsBarChartManager />
              </ManagerChartCard>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <ManagerChartCard
                title="Driver Status"
                subtitle="Workforce distribution"
                color="156, 39, 176"
                icon={PeopleIcon}
                height="380px"
              >
                <RolePieChart
                  color="info"
                  title=""
                  description=""
                  date=""
                />
              </ManagerChartCard>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <ManagerChartCard
                title="Cost Analysis"
                subtitle="Fuel and operational costs"
                color="255, 152, 0"
                icon={SpeedIcon}
                height="380px"
              >
                <ConsumptionCostChartManager />
              </ManagerChartCard>
            </Grid>
          </Grid>
        </MDBox>

        {/* Bottom Section */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <ManagerChartCard
                title="Driver Performance"
                subtitle="Individual performance metrics and analytics"
                color="76, 175, 80"
                icon={AssessmentIcon}
                height="350px"
              >
                <DriverPerformanceStats />
              </ManagerChartCard>
            </Grid>
            <Grid item xs={12} lg={4}>
              <ManagerChartCard
                title="Fuel Management"
                subtitle="Cost optimization insights"
                color="255, 193, 7"
                icon={SpeedIcon}
                height="350px"
              >
                <FuelCostStatCardManager />
              </ManagerChartCard>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManagerDashboard;
