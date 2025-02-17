"use client";

import React from "react";
import { Box, Card, Typography, Divider, Button, List, ListItemButton, ListItemText, ListItem } from "@mui/material";
import { useList } from "@refinedev/core";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";

interface Activity {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export default function ActivitiesPage() {
  const { data: activitiesResponse, isLoading, isError } = useList<Activity>({
    resource: "activities",
    pagination: { pageSize: 50 },
  });
  const activities: Activity[] = activitiesResponse?.data ?? [];

  // --- Action Handlers for Activities ---
  const handleCreateActivity = () => {
    console.log("Navigate to: /en/crm/contact/activity/create");
  };

  const handleEditActivity = (id: string) => {
    console.log("Navigate to: /en/crm/contact/activity/edit/" + id);
  };

  const handleShowActivity = (id: string) => {
    console.log("Navigate to: /en/crm/contact/activity/show/" + id);
  };

  const handleDeleteActivity = (id: string) => {
    console.log("Navigate to: /en/crm/contact/activity/delete/" + id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Activities Page
      </Typography>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleCreateActivity}>
          Create Activity
        </Button>
      </Box>
      <Card sx={{ p: 2, height: { xs: "auto", md: "80vh" }, overflowY: "auto" }}>
        {isLoading ? (
          <Typography>Loading activities...</Typography>
        ) : isError ? (
          <Typography>Error loading activities.</Typography>
        ) : (
          <List>
            {activities.map((activity) => (
              <React.Fragment key={activity.id}>
                <ListItem component="li" secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="text" onClick={() => handleEditActivity(activity.id)}>Edit</Button>
                    <Button variant="text" onClick={() => handleShowActivity(activity.id)}>Show</Button>
                    <Button variant="text" color="error" onClick={() => handleDeleteActivity(activity.id)}>Delete</Button>
                  </Box>
                }>
                  <ListItemText
                    primary={activity.title}
                    secondary={`${activity.description} ${activity.date ? `| Date: ${new Date(activity.date).toLocaleDateString()}` : ""}`}
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
