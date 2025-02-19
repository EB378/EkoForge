"use client";

import React from "react";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  List,
  DateField,
  DeleteButton,
  EditButton,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { useList } from "@refinedev/core";

export default function LedgerList() {
  // Configure the data grid for the ledger resource.
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    meta: { select: "*" },
  });
  console.log("Fetched ledger data:", dataGridProps);

  // Fetch all transaction sources.
  const {
    data: transactionSourcesData,
    isLoading: transactionSourcesLoading,
    isError: transactionSourcesError,
  } = useList({
    resource: "transaction_sources",
  });

  const transactionSources = transactionSourcesData?.data ?? [];

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Ledger ID",
        type: "number",
        minWidth: 70,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "transaction_date",
        headerName: "Transaction Date",
        type: "date",
        minWidth: 100,
        headerAlign: "left",
        align: "left",
        valueGetter: ({ value }: GridRenderCellParams<any>) =>
          value ? new Date(value) : null,
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <DateField value={value} />
        ),
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <Typography variant="body2">{value || "-"}</Typography>
        ),
      },
      {
        field: "entry_type",
        headerName: "Entry",
        minWidth: 100,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "sale",
        headerName: "Sale",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "transaction_source", // This column will display the text from the transaction source.
        headerName: "Transaction Source",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
        renderCell: ({ value }: GridRenderCellParams<any>) => {
          // Find the matching transaction source by UUID.
          const ts = transactionSources.find((item: any) => item.id === value);
          return (
            <Typography variant="body2">
              {ts && ts.title ? ts.title : value || "-"}
            </Typography>
          );
        },
      },
      {
        field: "details",
        headerName: "Details",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "internal_details",
        headerName: "Internal Details",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "deal",
        headerName: "Deal",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "responsible_person",
        headerName: "Responsible Person",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "sales_person",
        headerName: "Sales Person",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "created_by",
        headerName: "Created By",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "account_details",
        headerName: "Account Details",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "invoice_number",
        headerName: "Invoice Number",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "currency",
        headerName: "Currency",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "created_at",
        headerName: "Created At",
        type: "dateTime",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
        valueGetter: ({ value }: GridRenderCellParams<any>) =>
          value ? new Date(value) : null,
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <DateField value={value} />
        ),
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        type: "dateTime",
        minWidth: 150,
        headerAlign: "left",
        align: "left",
        valueGetter: ({ value }: GridRenderCellParams<any>) =>
          value ? new Date(value) : null,
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <DateField value={value} />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        headerAlign: "right",
        align: "right",
        sortable: false,
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        ),
      },
    ],
    [transactionSources]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
