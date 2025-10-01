/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography, Avatar, Chip } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import VisionDashboardLayout from "examples/LayoutContainers/VisionDashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VisionDataTable from "examples/Tables/DataTable/VisionDataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// Vision UI colors
import visionColors from "assets/theme/base/visionColors";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  // Enhanced columns with Vision UI styling
  const visionAuthorsColumns = columns.map((column) => ({
    ...column,
    Cell: ({ cell }) => {
      if (column.accessor === "author") {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={cell.row.original.image}
              sx={{
                width: 40,
                height: 40,
                border: `2px solid ${visionColors.core.border.accent}`,
              }}
            />
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: visionColors.core.text.primary,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {cell.row.original.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: visionColors.core.text.tertiary,
                  fontSize: "0.75rem",
                }}
              >
                {cell.row.original.email}
              </Typography>
            </Box>
          </Box>
        );
      }
      
      if (column.accessor === "status") {
        const status = cell.value;
        const statusColors = {
          online: visionColors.status.success.main,
          offline: visionColors.core.text.tertiary,
          busy: visionColors.status.warning.main,
        };
        
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              backgroundColor: `${statusColors[status.toLowerCase()]}20`,
              color: statusColors[status.toLowerCase()],
              border: `1px solid ${statusColors[status.toLowerCase()]}40`,
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "capitalize",
            }}
          />
        );
      }
      
      return (
        <Typography
          variant="body2"
          sx={{
            color: visionColors.core.text.secondary,
            fontSize: "0.875rem",
          }}
        >
          {cell.value}
        </Typography>
      );
    },
  }));

  // Enhanced projects columns
  const visionProjectsColumns = pColumns.map((column) => ({
    ...column,
    Cell: ({ cell }) => {
      if (column.accessor === "project") {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: visionColors.gradients.accent.neon,
                color: "#000000",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {cell.row.original.name?.charAt(0)}
            </Avatar>
            <Typography
              variant="body1"
              sx={{
                color: visionColors.core.text.primary,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {cell.row.original.name}
            </Typography>
          </Box>
        );
      }
      
      if (column.accessor === "completion") {
        const percentage = parseInt(cell.value);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 6,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${percentage}%`,
                  height: "100%",
                  background: percentage > 75 
                    ? visionColors.gradients.success.main
                    : percentage > 50 
                    ? visionColors.gradients.warning.main
                    : visionColors.gradients.error.main,
                  borderRadius: "3px",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: visionColors.core.text.secondary,
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {cell.value}
            </Typography>
          </Box>
        );
      }
      
      return (
        <Typography
          variant="body2"
          sx={{
            color: visionColors.core.text.secondary,
            fontSize: "0.875rem",
          }}
        >
          {cell.value}
        </Typography>
      );
    },
  }));

  return (
    <VisionDashboardLayout>
      <DashboardNavbar />
      
      {/* Page Header */}
      <MDBox mb={4}>
        <Box 
          className="vision-glass"
          sx={{ 
            p: 4, 
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(21, 27, 61, 0.6) 0%, rgba(30, 42, 120, 0.3) 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #00D4FF, #4D9AFF, #00E5CC, #8B5CF6)",
            }
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: "white", 
              fontWeight: 700, 
              mb: 1,
              background: "linear-gradient(135deg, #FFFFFF 0%, #00D4FF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Data Tables
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#A0AEC0", 
              fontWeight: 400,
            }}
          >
            Advanced data visualization and management
          </Typography>
        </Box>
      </MDBox>

      <MDBox py={3}>
        <Grid container spacing={6}>
          {/* Authors Table */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: visionColors.components.card.background,
                backdropFilter: "blur(20px)",
                border: `1px solid ${visionColors.components.card.border}`,
                borderRadius: "20px",
                boxShadow: visionColors.shadows.glass.medium,
                overflow: "hidden",
              }}
            >
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                sx={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #4D9AFF 100%)",
                  borderRadius: "16px",
                  boxShadow: "0 0 25px rgba(0, 212, 255, 0.5)",
                }}
              >
                <MDTypography variant="h6" color="white" sx={{ fontWeight: 600 }}>
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <VisionDataTable
                  table={{ columns: visionAuthorsColumns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* Projects Table */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: visionColors.components.card.background,
                backdropFilter: "blur(20px)",
                border: `1px solid ${visionColors.components.card.border}`,
                borderRadius: "20px",
                boxShadow: visionColors.shadows.glass.medium,
                overflow: "hidden",
              }}
            >
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                sx={{
                  background: "linear-gradient(135deg, #00E5CC 0%, #4D9AFF 100%)",
                  borderRadius: "16px",
                  boxShadow: "0 0 25px rgba(0, 229, 204, 0.5)",
                }}
              >
                <MDTypography variant="h6" color="white" sx={{ fontWeight: 600 }}>
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <VisionDataTable
                  table={{ columns: visionProjectsColumns, rows: pRows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </VisionDashboardLayout>
  );
}

export default Tables;
