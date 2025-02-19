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
} from "@mui/material";
import { useList } from "@refinedev/core";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useLocale, useTranslations } from "next-intl";
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
  // Fetch clients from the "clients" resource.
  const {
    data: clientsResponse,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useList<Client>({ resource: "clients", pagination: { pageSize: 50 } });
  const clients: Client[] = clientsResponse?.data ?? [];

  // State to hold the selected client's ID.
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Fetch contacts from the "contacts" resource.
  const {
    data: contactsResponse,
    isLoading: contactsLoading,
    isError: contactsError,
  } = useList<Contact>({
    filters: selectedClientId
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
  const contacts: Contact[] = contactsResponse?.data ?? [];

  // --- Action Handlers for Clients ---
  const handleCreateClient = () => {
    router.push(`/${locale}/crm/clients/create`);
  };

  const handleEditClient = (id: string) => {
    router.push(`/${locale}/crm/clients/edit/${id}`);
  };

  const handleShowClient = (id: string) => {
    router.push(`/${locale}/crm/clients/show/${id}`);
  };

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
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">Clients</Typography>
              <Button variant="contained" onClick={handleCreateClient}>
                Create Company
              </Button>
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
                      component="li"
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
                      {/* Action Buttons for Company */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <EditButton
                          hideText
                          recordItemId={client.id}
                          onClick={() => handleEditClient(client.id)}
                        />
                        <ShowButton 
                            hideText 
                            recordItemId={client.id} 
                            onClick={() => handleShowClient(client.id)}
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
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">
                {selectedClientId
                  ? `Contacts for ${
                      clients.find((c) => c.id === selectedClientId)?.client
                    }`
                  : "All Contacts"}
              </Typography>
              <Button variant="contained" onClick={handleCreateContact}>
                Create Contact
              </Button>
            </Box>
            {contactsLoading ? (
              <Typography>Loading contacts...</Typography>
            ) : contactsError ? (
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
            {selectedClientId && (
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={() => setSelectedClientId(null)}>
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
