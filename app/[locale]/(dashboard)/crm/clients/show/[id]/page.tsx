"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

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

interface Contact {
  id: string;
  name: string;
}

export default function ShowClient(): JSX.Element {
  // Fetch client record from the "clients" resource.
  const { queryResult: clientQuery } = useShow<Client>({
    resource: "clients",
  });
  const record = clientQuery?.data?.data as Client | undefined;

  // Once the client record is available, fetch the contact record for the primary contact.
  const { queryResult: contactQuery } = useShow<Contact>({
    resource: "contacts",
    id: record?.primary_contact,
    meta: { select: "name" },
    queryOptions: { enabled: !!record },
  });
  
  const contactRecord = contactQuery?.data?.data as Contact | undefined;
  

  if (!record) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2, height: "100vh" }}>
      <Show isLoading={clientQuery.isLoading}>
        <Typography variant="h4" gutterBottom>
          {record.client}
        </Typography>
        <Typography>Status: {record.status}</Typography>
        <Typography>Signed Date: {record.signed_date}</Typography>
        <Typography>Email: {record.email}</Typography>
        <Typography>Phone: {record.phone}</Typography>
        <Typography>Website: {record.website}</Typography>
        <Typography>
          Primary Contact: {contactRecord?.name || record.primary_contact}
        </Typography>
      </Show>
    </Box>
  );
}
