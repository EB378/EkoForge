"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { getTheme } from "@theme/theme";
import { useColorMode } from "@contexts/color-mode";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LineChart } from "@mui/x-charts/LineChart";
import { List as MuiList, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useList } from "@refinedev/core";

/* ------------------------------------------------------------------
  Dummy Data for Charts
------------------------------------------------------------------ */
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 8000 },
  { month: "Aug", sales: 5000 },
  { month: "Sep", sales: 6000 },
  { month: "Oct", sales: 7000 },
  { month: "Nov", sales: 8000 },
  { month: "Dec", sales: 9000 },
];

const growthData = [
  { month: "Jan", customers: 50 },
  { month: "Feb", customers: 80 },
  { month: "Mar", customers: 65 },
  { month: "Apr", customers: 90 },
  { month: "May", customers: 120 },
  { month: "Jun", customers: 150 },
  { month: "Jul", customers: 130 },
  { month: "Aug", customers: 160 },
  { month: "Sep", customers: 170 },
  { month: "Oct", customers: 180 },
  { month: "Nov", customers: 190 },
  { month: "Dec", customers: 220 },
];

/* ------------------------------------------------------------------
  Type Definitions
------------------------------------------------------------------ */
interface Deal {
  id: string;
  title: string;
  amount: string;
  status: string;
  deal_date: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
}

/* ------------------------------------------------------------------
  DataGrid Columns for CRM Records (Reports Section)
------------------------------------------------------------------ */
const crmColumns: GridColDef[] = [
  { field: "client", headerName: "Client", minWidth: 150, flex: 1 },
  { field: "status", headerName: "Status", minWidth: 100, flex: 1 },
  { field: "primary_contact", headerName: "Primary Contact", minWidth: 150, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
  { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <EditButton hideText recordItemId={params.row.id} />
        <ShowButton hideText recordItemId={params.row.id} />
        <DeleteButton hideText recordItemId={params.row.id} />
      </Box>
    ),
  },
];

export default function CRMPage() {
  const { mode } = useColorMode();
  const theme = getTheme(mode);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // Fetch CRM records for the DataGrid (resource "clients")
  const { data: ClientsResponse, isLoading: clientsLoading, isError: clientsError } = useList({
    pagination: { pageSize: 10 },
  });
  const crmClients = ClientsResponse?.data ?? [];

  // Fetch CRM records for the DataGrid (resource "deals") - only open deals
  const { data: dealsResponse, isLoading: dealsLoading, isError: dealsError } = useList<Deal>({
    resource: "deals",
    filters: [
      {
        field: "status",
        operator: "eq",
        value: "open",
      },
    ],
  });
  const openDeals = dealsResponse?.data ?? [];

  // Fetch CRM records for the DataGrid (resource "activities")
  const { data: activitiesResponse, isLoading: activitiesLoading, isError: activitiesError } = useList<Activity>({
    resource: "deals",
    filters: [
      {
        field: "status",
        operator: "eq",
        value: "open",
      },
    ],
  });
  const recentActivities = activitiesResponse?.data ?? [];


  return (
    <Box sx={{ p: 2 }}>
      {/* Dashboard Section */}
      <Box id="dashboard" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {isLargeScreen && (
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
                <Typography variant="h6" gutterBottom>
                  Sales Overview
                </Typography>
                <Box sx={{ height: 250 }}>
                  <LineChart
                    dataset={salesData}
                    xAxis={[{ dataKey: "month", scaleType: "band" }]}
                    series={[
                      {
                        id: "sales",
                        type: "line",
                        data: salesData.map((item) => item.sales),
                        dataKey: "sales",
                        color: theme.palette.primary.main,
                      },
                    ]}
                    tooltip={{}}
                    legend={{}}
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
                <Typography variant="h6" gutterBottom>
                  Customer Growth
                </Typography>
                <Box sx={{ height: 250 }}>
                  <LineChart
                    dataset={growthData}
                    xAxis={[{ dataKey: "month", scaleType: "band" }]}
                    series={[
                      {
                        id: "growth",
                        type: "line",
                        data: growthData.map((item) => item.customers),
                        dataKey: "customers",
                        color: theme.palette.secondary.main,
                      },
                    ]}
                    tooltip={{}}
                    legend={{}}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* CRM Sections */}
      <Grid container spacing={4}>
        {/* Open Deals Section */}
        <Grid item xs={12} md={6}>
          <Box id="deals">
            <Card
              sx={{
                p: 2,
                backgroundColor: theme.palette.strong.default,
                maxHeight: { xs: "auto", md: 300 },
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Open Deals
              </Typography>
              {openDeals.map((deal: Deal) => (
                <Box key={deal.id} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">{deal.title}</Typography>
                  <Typography variant="body2">{deal.amount}</Typography>
                  <Typography variant="body2">{deal.status}</Typography>
                  <Typography variant="body2">
                    Date: {new Date(deal.deal_date).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </Card>
          </Box>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12} md={6}>
          <Box id="activities">
            <Card
              sx={{
                p: 2,
                backgroundColor: theme.palette.strong.default,
                maxHeight: { xs: "auto", md: 300 },
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              {recentActivities.map((activity: Activity) => (
                <Box key={activity.id} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">{activity.title}</Typography>
                  <Typography variant="body2">{activity.description}</Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Clients Section */}
      <Box id="Clients" sx={{ mt: 4 }}>
        <Card
          sx={{
            height: 500,
            p: 2,
            backgroundColor: theme.palette.strong.default,
          }}
        >
          <MuiList title={<Typography variant="h5">CRM Clients</Typography>}>
            <DataGrid rows={crmClients} columns={crmColumns} />
          </MuiList>
        </Card>
      </Box>
    </Box>
  );
}
