"use client";

import React from "react";
import { Box, Card, Typography, Divider, Button, List, ListItemButton, ListItemText, ListItem } from "@mui/material";
import { useList } from "@refinedev/core";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";

interface Deal {
  id: string;
  title: string;
  amount: string;
  status: string;
  deal_date: string;
}

export default function DealsPage() {
  const { data: dealsResponse, isLoading, isError } = useList<Deal>({
    resource: "deals",
    pagination: { pageSize: 50 },
  });
  const deals: Deal[] = dealsResponse?.data ?? [];

  // --- Action Handlers for Deals ---
  const handleCreateDeal = () => {
    console.log("Navigate to: /en/crm/contact/deal/create");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Deals Page
      </Typography>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleCreateDeal}>
          Create Deal
        </Button>
      </Box>
      <Card sx={{ p: 2, height: { xs: "auto", md: "80vh" }, overflowY: "auto" }}>
        {isLoading ? (
          <Typography>Loading deals...</Typography>
        ) : isError ? (
          <Typography>Error loading deals.</Typography>
        ) : (
          <List>
            {deals.map((deal) => (
              <React.Fragment key={deal.id}>
                <ListItem component="li" secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <EditButton hideText recordItemId={deal.id} />
                    <ShowButton hideText recordItemId={deal.id} />
                    <DeleteButton hideText recordItemId={deal.id} />
                  </Box>
                }>
                  <ListItemText
                    primary={deal.title}
                    secondary={`Amount: ${deal.amount} | Status: ${deal.status} | Date: ${new Date(deal.deal_date).toLocaleDateString()}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Card>
    </Box>
  );
}
