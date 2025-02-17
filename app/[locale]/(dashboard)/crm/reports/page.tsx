"use client";

import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";

const crmColumns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 70 },
  { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
  { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
];

export default function ReportsPage() {
  const { data: recordsResponse, isLoading, isError } = useList({
    resource: "crmRecords",
    pagination: { pageSize: 10 },
  });
  const crmRecords = recordsResponse?.data ?? [];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reports Page
      </Typography>
      <Card sx={{ height: 500, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          CRM Records
        </Typography>
        <DataGrid rows={crmRecords} columns={crmColumns} />
      </Card>
    </Box>
  );
}
