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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useList, useUpdate } from "@refinedev/core";
import { EditButton, DeleteButton, ShowButton } from "@refinedev/mui";
import { useRouter } from "next/navigation";

interface Prospect {
  id: string;
  company_name: string;
  contact_name?: string;
  email: string;
  phone?: string;
  website?: string;
  status: string;
  notes?: string;
  is_migrated: boolean;
  converted_at?: string;
  created_at: string;
  updated_at: string;
}

export default function ProspectsList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Build filters based on search and status filter.
  const filters = [];
  if (search) {
    filters.push({
      field: "company_name",
      operator: "contains" as "contains",
      value: search,
    });
  }
  if (statusFilter) {
    filters.push({
      field: "status",
      operator: "eq" as "eq",
      value: statusFilter,
    });
  }

  const { data, isLoading, isError } = useList<Prospect>({
    resource: "prospects",
    pagination: { pageSize: 50 },
    filters,
  });
  const prospects = data?.data ?? [];

  // Hook to update a prospect.
  const { mutate: updateProspect } = useUpdate<Prospect>();

  const handleStatusChange = (id: string, newStatus: string) => {
    updateProspect(
      {
        resource: "prospects",
        id,
        values: { status: newStatus },
      },
      {
        onSuccess: () => {
          console.log(`Prospect ${id} status updated to ${newStatus}`);
        },
      }
    );
  };

  const handleCreate = () => router.push("/prospects/create");

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Prospects
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button variant="contained" onClick={handleCreate}>
                Create Prospect
              </Button>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Search Company"
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="1. new">1. new</MenuItem>
                    <MenuItem value="2. contacted">2. contacted</MenuItem>
                    <MenuItem value="3. engaged">3. engaged</MenuItem>
                    <MenuItem value="4. interested">4. interested</MenuItem>
                    <MenuItem value="5. salescall">5. salescall</MenuItem>
                    <MenuItem value="6. qualified">6. qualified</MenuItem>
                    <MenuItem value="7. negotitions">7. negotitions</MenuItem>
                    <MenuItem value="8. signed">8. Signed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {isLoading ? (
              <Typography>Loading prospects...</Typography>
            ) : isError ? (
              <Typography>Error loading prospects.</Typography>
            ) : (
              <List>
                {prospects.map((prospect) => (
                  <React.Fragment key={prospect.id}>
                    <ListItemButton
                      onClick={() => router.push(`/prospects/show/${prospect.id}`)}
                    >
                      <ListItemText
                        primary={prospect.company_name}
                        secondary={`Email: ${prospect.email}`}
                      />
                      {/* Dropdown to change prospect status */}
                      <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                        <Select
                          value={prospect.status}
                          onChange={(e) =>
                            handleStatusChange(prospect.id, e.target.value)
                          }
                        >
                          <MenuItem value="1. new">1. new</MenuItem>
                          <MenuItem value="2. contacted">2. contacted</MenuItem>
                          <MenuItem value="3. engaged">3. engaged</MenuItem>
                          <MenuItem value="4. interested">4. interested</MenuItem>
                          <MenuItem value="5. salescall">5. salescall</MenuItem>
                          <MenuItem value="6. qualified">6. qualified</MenuItem>
                          <MenuItem value="7. negotitions">7. negotitions</MenuItem>
                          <MenuItem value="8. Signed">8. Signed</MenuItem>
                        </Select>
                      </FormControl>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <EditButton
                          hideText
                          recordItemId={prospect.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/prospects/edit/${prospect.id}`);
                          }}
                        />
                        <DeleteButton hideText recordItemId={prospect.id} />
                        <ShowButton
                          hideText
                          recordItemId={prospect.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/prospects/show/${prospect.id}`);
                          }}
                        />
                        <Button
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/prospects/migrate/${prospect.id}`);
                          }}
                        >
                          Migrate
                        </Button>
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
