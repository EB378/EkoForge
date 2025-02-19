"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";

interface Client {
  id: string;
  client: string;
  status: string;
  signed_date: string;
  email: string;
  phone: string;
  website: string;
  primary_contact: string;
}

export default function ShowClient(): JSX.Element {
  const { queryResult } = useShow<Client>({ resource: "clients" });
  const record = queryResult?.data?.data as Client;

  if (!record) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2, height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        {record.client}
      </Typography>
      <Typography>Status: {record.status}</Typography>
      <Typography>Signed Date: {record.signed_date}</Typography>
      <Typography>Email: {record.email}</Typography>
      <Typography>Phone: {record.phone}</Typography>
      <Typography>Website: {record.website}</Typography>
      <Typography>Primary Contact: {record.primary_contact}</Typography>
    </Box>
  );
}
