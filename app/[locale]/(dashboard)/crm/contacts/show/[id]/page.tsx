"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

interface Contact {
  id: string;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function ShowContact(): JSX.Element {
  const { queryResult } = useShow<Contact>({ resource: "contacts" });
  const record = queryResult?.data?.data as Contact;

  if (!record) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Show isLoading={queryResult.isLoading}>
        <Typography variant="h4" gutterBottom>
          {record.name}
        </Typography>
        <Typography>Client ID: {record.client_id}</Typography>
        <Typography>Email: {record.email}</Typography>
        <Typography>Phone: {record.phone}</Typography>
        <Typography>Role: {record.role}</Typography>
      </Show>
    </Box>
  );
}
