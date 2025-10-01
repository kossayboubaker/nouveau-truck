/**
 * Vision UI Data Table Component
 * Enhanced table with glassmorphism and modern styling
 */

import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowUpward as SortUpIcon,
  ArrowDownward as SortDownIcon,
  UnfoldMore as UnsortedIcon,
} from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import visionColors from "assets/theme/base/visionColors";

function VisionDataTable({ 
  entriesPerPage, 
  canSearch, 
  showTotalEntries, 
  table, 
  pagination, 
  isSorted, 
  noEndBorder,
  ...rest 
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <Pagination
      key={option}
      count={pageOptions.length}
      page={pageIndex + 1}
      onChange={(event, value) => gotoPage(value - 1)}
      color="primary"
      size="large"
      sx={{
        "& .MuiPaginationItem-root": {
          backgroundColor: "rgba(26, 32, 44, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: visionColors.core.text.secondary,
          fontWeight: 500,
          
          "&:hover": {
            backgroundColor: "rgba(0, 212, 255, 0.1)",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            color: visionColors.accent.neon.cyan,
          },
          
          "&.Mui-selected": {
            backgroundColor: visionColors.accent.neon.cyan,
            color: "#000000",
            fontWeight: 600,
            
            "&:hover": {
              backgroundColor: visionColors.accent.neon.cyan,
            },
          },
        },
      }}
    />
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = (value) => {
    setGlobalFilter(value || undefined);
    setSearch(value);
  };

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: visionColors.components.card.background,
        backdropFilter: "blur(20px)",
        border: `1px solid ${visionColors.components.card.border}`,
        borderRadius: "20px",
        boxShadow: visionColors.shadows.glass.medium,
        overflow: "hidden",
      }}
      {...rest}
    >
      {/* Search and Entries Controls */}
      {entriesPerPage || canSearch ? (
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: `1px solid ${visionColors.core.border.primary}`,
            background: "rgba(15, 20, 25, 0.5)",
          }}
        >
          {entriesPerPage && (
            <MDBox sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MDTypography variant="body2" color={visionColors.core.text.secondary}>
                Show
              </MDTypography>
              <FormControl size="small">
                <Select
                  value={pageSize}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  sx={{
                    backgroundColor: "rgba(15, 20, 25, 0.6)",
                    border: `1px solid ${visionColors.core.border.primary}`,
                    borderRadius: "8px",
                    color: visionColors.core.text.primary,
                    minWidth: "80px",
                    
                    "& .MuiSelect-icon": {
                      color: visionColors.core.text.secondary,
                    },
                    
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  {entries.map((entry) => (
                    <MenuItem key={entry} value={entry}>
                      {entry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MDTypography variant="body2" color={visionColors.core.text.secondary}>
                entries
              </MDTypography>
            </MDBox>
          )}

          {canSearch && (
            <TextField
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: visionColors.core.text.tertiary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(15, 20, 25, 0.6)",
                  border: `1px solid ${visionColors.core.border.primary}`,
                  borderRadius: "8px",
                  color: visionColors.core.text.primary,
                  
                  "&:hover": {
                    border: `1px solid ${visionColors.core.border.accent}`,
                  },
                  
                  "&.Mui-focused": {
                    border: `1px solid ${visionColors.accent.neon.cyan}`,
                    boxShadow: `0 0 10px ${visionColors.accent.glow.cyan}`,
                  },
                  
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
        </MDBox>
      ) : null}

      {/* Table */}
      <Table {...getTableProps()}>
        {/* Table Header */}
        <MDBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, headerKey) => (
                <MDBox
                  component="th"
                  key={headerKey}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  sx={{
                    background: visionColors.components.table.header,
                    borderBottom: `1px solid ${visionColors.components.table.border}`,
                    color: visionColors.core.text.primary,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "16px 24px",
                    cursor: isSorted ? "pointer" : "default",
                    position: "relative",
                    
                    "&:hover": isSorted ? {
                      background: "rgba(15, 20, 25, 0.9)",
                    } : {},
                  }}
                >
                  <MDBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="h6" color="inherit">
                      {column.render("Header")}
                    </MDTypography>
                    
                    {isSorted && (
                      <MDBox ml={1}>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortDownIcon sx={{ fontSize: "16px" }} />
                          ) : (
                            <SortUpIcon sx={{ fontSize: "16px" }} />
                          )
                        ) : (
                          <UnsortedIcon sx={{ fontSize: "16px", opacity: 0.5 }} />
                        )}
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              ))}
            </TableRow>
          ))}
        </MDBox>

        {/* Table Body */}
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                key={key}
                sx={{
                  background: visionColors.components.table.row,
                  borderBottom: `1px solid ${visionColors.components.table.border}`,
                  transition: "all 0.2s ease",
                  
                  "&:hover": {
                    background: visionColors.components.table.rowHover,
                    transform: "translateX(4px)",
                  },
                  
                  "&:last-child": {
                    borderBottom: noEndBorder ? "none" : `1px solid ${visionColors.components.table.border}`,
                  },
                }}
              >
                {row.cells.map((cell, cellKey) => (
                  <MDBox
                    component="td"
                    key={cellKey}
                    {...cell.getCellProps()}
                    sx={{
                      padding: "16px 24px",
                      color: visionColors.core.text.secondary,
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      border: "none",
                    }}
                  >
                    {cell.render("Cell")}
                  </MDBox>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination and Info */}
      {pagination && (
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderTop: `1px solid ${visionColors.core.border.primary}`,
            background: "rgba(15, 20, 25, 0.5)",
          }}
        >
          {showTotalEntries && (
            <MDTypography variant="body2" color={visionColors.core.text.secondary}>
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          )}

          <MDBox>{renderPagination}</MDBox>
        </MDBox>
      )}
    </TableContainer>
  );
}

// Setting default values for the props of VisionDataTable
VisionDataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the VisionDataTable
VisionDataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default VisionDataTable;
