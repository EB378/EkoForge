"use client";

import React from "react";
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
import { useList, useShow } from "@refinedev/core";


// Component to display a client's name based on clientId.
function ClientName({ clientId }: { clientId: string }) {
  const { queryResult } = useShow({
    resource: "clients",
    id: clientId,
    meta: { select: "client" },
    queryOptions: { enabled: !!clientId },
  });
  const clientData = queryResult?.data?.data as { client: string } | undefined;
  if (!clientData) return <span>Not Available.</span>;
  return <span>{clientData.client}</span>;
}

// Component to display a profile's full name based on profileId.
function ProfileName({ profileId }: { profileId: string }) {
  const { queryResult } = useShow({
    resource: "profiles",
    id: profileId,
    meta: { select: "fullname" },
    queryOptions: { enabled: !!profileId },
  });
  const profileData = queryResult?.data?.data as { fullname: string } | undefined;
  if (!profileData) return <span>Loading...</span>;
  return <span>{profileData.fullname}</span>;
}

/* ------------------------------------------------------------------
  Type Definitions
------------------------------------------------------------------ */
interface Deal {
  id: string;
  client_id: string;
  title: string;
  amount: string;
  status: string;
  deal_date: string;
  profile_id: string;
}

interface Reports {
  id: string;
  client: string;
  title: string;
  description: string;
}

interface Sales {
  id: string;
  transaction_date: Date;
  amount: number;
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
  

  // Fetch CRM records for the DataGrid (resource "reports")
  const { data: reportsResponse, isLoading: reportsLoading, isError: reportsError } = useList<Reports>({
    resource: "reports",
  });
  const recentReports = reportsResponse?.data ?? [];

  // Fetch CRM records for the DataGrid (resource "ledger")
  const { data: salesResponse, isLoading: salesLoading, isError: salesError } = useList<Sales>({
    resource: "ledger",
    filters: [
      {
        field: "entry_type",
        operator: "eq",
        value: "credit",
      },
      {
        field: "sale",
        operator: "eq",
        value: true,
      },
    ],
  });

  
  const salesData = salesResponse?.data ?? [];
  console.log("Sales Data1",salesData);

  // Ensure salesData is sorted by transaction_date in ascending order.
  const sortedSalesData = [...salesData].sort(
    (a, b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime()
  );
  console.log("Sales Data2", sortedSalesData);

  const cumulativeSalesData = sortedSalesData.reduce((acc, curr, index) => {
    const prevSum = index === 0 ? 0 : acc[index - 1].sales;
    acc.push({
      date: curr.transaction_date,
      sales: prevSum + curr.amount,
    });
    return acc;
  }, [] as { date: Date; sales: number }[]);
  console.log("Sales Data3", cumulativeSalesData);

  return (
    <Box sx={{ p: 2 }}>
      {/* Dashboard Section */}
      <Box id="dashboard" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {isLargeScreen && (
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
                <Typography variant="h6" gutterBottom>
                  Sales Overview
                </Typography>
                <Box sx={{ height: 250 }}>
                  <LineChart
                    dataset={sortedSalesData.map((item) => ({ month: item.transaction_date, sales: item.amount }))}
                    xAxis={[{ dataKey: "month", scaleType: "point",}]}
                    series={[
                      {
                        id: "sales",
                        //  type: "line",
                        label: "Sales",
                        data: cumulativeSalesData.map((item) => item.sales),
                        dataKey: "sales",
                        color: theme.palette.primary.main,
                      },
                    ]}
                    tooltip={{ trigger: 'item' }}
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
              <Divider sx={{ my: 1 }} />
              {openDeals.map((deal: Deal) => (
                <Box key={deal.id} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">{deal.title}</Typography>
                  <Typography variant="subtitle1"><ClientName clientId={deal.client_id}/></Typography>
                  <Typography variant="body2"><ProfileName profileId={deal.profile_id}/></Typography>
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
          <Box id="reports">
            <Card
              sx={{
                p: 2,
                backgroundColor: theme.palette.strong.default,
                maxHeight: { xs: "auto", md: 300 },
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Recent Reports
              </Typography>
              <Divider sx={{ my: 1 }} />
              {recentReports.map((reports: Reports) => (
                <Box key={reports.id} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1"><ClientName clientId={reports.client}/></Typography>
                  <Typography variant="subtitle1">{reports.title}</Typography>
                  <Typography variant="body2">{reports.description}</Typography>
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
            p: 2,
            backgroundColor: theme.palette.strong.default,
          }}
        >
          <MuiList title={<Typography variant="h5">Clients</Typography>}>
            <DataGrid rows={crmClients} columns={crmColumns} />
          </MuiList>
        </Card>
      </Box>
    </Box>
  );
}
