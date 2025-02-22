"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Button,
  ListItem,
  TextField,
} from "@mui/material";
import { useList } from "@refinedev/core";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
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

interface Contact {
  id: string;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function ContactsPage() {
  const locale = useLocale();
  const router = useRouter();

  // State for searching contacts by name.
  const [search, setSearch] = useState<string>("");

  // Fetch clients from the "clients" resource.
  const {
    data: clientsResponse,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useList<Client>({ resource: "clients", pagination: { pageSize: 50 } });
  const clients: Client[] = clientsResponse?.data ?? [];

  // State to hold the selected client's ID.
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Fetch contacts for the selected client (only used when no search query is provided).
  const {
    data: contactsResponse,
    isLoading: contactsLoading,
    isError: contactsError,
  } = useList<Contact>({
    filters: selectedClientId && !search
      ? [
          {
            field: "client_id",
            operator: "eq",
            value: selectedClientId,
          },
        ]
      : [],
    pagination: { pageSize: 50 },
  });

  // Fetch contacts based on the search query.
  const {
    data: contacts2Response,
    isLoading: contacts2Loading,
    isError: contacts2Error,
  } = useList<Contact>({
    pagination: { pageSize: 50 },
    filters: search
      ? [
          {
            field: "name",
            operator: "contains",
            value: search,
          },
        ]
      : [],
  });

  // Use the search-based contacts if a search term exists; otherwise, use the client-filtered contacts.
  const contacts: Contact[] = search
    ? contacts2Response?.data ?? []
    : contactsResponse?.data ?? [];

  // Determine loading and error states.
  const contactsLoadingState = search ? contacts2Loading : contactsLoading;
  const contactsErrorState = search ? contacts2Error : contactsError;

  // --- Action Handlers for Clients ---

  // --- Action Handlers for Contacts ---
  const handleCreateContact = () => {
    router.push(`/${locale}/crm/contacts/create`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contacts Page
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
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Clients</Typography>
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
                        <EditButton
                          hideText
                          recordItemId={client.id}
                        />
                        <ShowButton
                          hideText
                          recordItemId={client.id}
                        />
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Card>
        </Grid>

        {/* Right Column: Contacts List */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: { xs: "auto", md: "80vh" },
              overflowY: "auto",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">
                {search
                  ? "Search Results"
                  : selectedClientId
                  ? `Contacts for ${
                      clients.find((c) => c.id === selectedClientId)?.client
                    }`
                  : "All Contacts"}
              </Typography>
              <Button variant="contained" onClick={handleCreateContact}>
                Create Contact
              </Button>
            </Box>
            {/* Search Field for Contacts */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Search Contacts"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {contactsLoadingState ? (
              <Typography>Loading contacts...</Typography>
            ) : contactsErrorState ? (
              <Typography>Error loading contacts.</Typography>
            ) : (
              <List>
                {contacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      component="li"
                      secondaryAction={
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <EditButton
                            hideText
                            recordItemId={contact.id}
                          />
                          <ShowButton
                            hideText
                            recordItemId={contact.id}
                          />
                          <DeleteButton
                            hideText
                            recordItemId={contact.id}
                          />
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={contact.name}
                        secondary={`${contact.email} | ${contact.phone} | ${contact.role}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
            {selectedClientId && !search && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedClientId(null)}
                >
                  Show All Contacts
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
