"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import { useList } from "@refinedev/core";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/mui";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  client: string; // Company name
  status: string;
  signed_date: string;
  email: string;
  phone: string;
  website: string;
  primary_contact: string;
}

export default function ClientsPage() {
  const locale = useLocale();
  const router = useRouter();

  // State for search query
  const [search, setSearch] = useState<string>("");

  // Fetch clients from the "clients" resource with a search filter.
  const {
    data: clientsResponse,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useList<Client>({
    pagination: { pageSize: 50 },
    filters: search
      ? [
          {
            field: "client",
            operator: "contains",
            value: search,
          },
        ]
      : [],
  });
  const clients: Client[] = clientsResponse?.data ?? [];

  // State to hold the selected client's ID.
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = clients.find((client) => client.id === selectedClientId);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Grid container spacing={2}>
        {/* Left Column: Clients List */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: { xs: "auto", md: "80vh" },
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6">Clients List</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/crm/clients/create")}
              >
                Create Client
              </Button>
            </Box>
            {/* Search Field */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Search Clients"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {clientsLoading ? (
              <Typography>Loading clients...</Typography>
            ) : clientsError ? (
              <Typography>Error loading clients.</Typography>
            ) : (
              <List>
                {clients.map((client) => (
                  <React.Fragment key={client.id}>
                    <ListItemButton
                      onClick={() =>
                        setSelectedClientId(
                          selectedClientId === client.id ? null : client.id
                        )
                      }
                      selected={selectedClientId === client.id}
                    >
                      <ListItemText
                        primary={client.client}
                        secondary={`${client.email} | ${client.phone}`}
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <EditButton hideText recordItemId={client.id} />
                        <ShowButton hideText recordItemId={client.id} />
                        <DeleteButton hideText recordItemId={client.id} />
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Card>
        </Grid>

        {/* Right Column: Selected Client Details */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: { xs: "auto", md: "80vh" },
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedClient ? "Client Details" : "Select a client to view details"}
            </Typography>
            {selectedClient ? (
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>Company Name:</strong> {selectedClient.client}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedClient.status}
                </Typography>
                <Typography variant="body1">
                  <strong>Signed Date:</strong> {selectedClient.signed_date}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedClient.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedClient.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Website:</strong> {selectedClient.website}
                </Typography>
                <Typography variant="body1">
                  <strong>Primary Contact:</strong> {selectedClient.primary_contact}
                </Typography>
              </CardContent>
            ) : (
              <Typography variant="body2">
                No client selected. Click on a client from the list to view details.
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
