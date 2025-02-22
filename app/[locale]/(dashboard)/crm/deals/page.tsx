"use client";

import React from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { useList, useShow } from "@refinedev/core";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

// Component to display a client's name based on clientId.
function ClientName({ clientId }: { clientId: string }) {
  const { queryResult } = useShow({
    resource: "clients",
    id: clientId,
    meta: { select: "client" },
    queryOptions: { enabled: !!clientId },
  });
  const clientData = queryResult?.data?.data as { client: string } | undefined;
  if (!clientData) return <span>Not Available.</span>;
  return <span>{clientData.client}</span>;
}

// Component to display a profile's full name based on profileId.
function ProfileName({ profileId }: { profileId: string }) {
  const { queryResult } = useShow({
    resource: "profiles",
    id: profileId,
    meta: { select: "fullname" },
    queryOptions: { enabled: !!profileId },
  });
  const profileData = queryResult?.data?.data as { fullname: string } | undefined;
  if (!profileData) return <span>Loading...</span>;
  return <span>{profileData.fullname}</span>;
}

export default function DealsPage() {
  const locale = useLocale();
  const router = useRouter();
  const { data: dealsResponse, isLoading, isError } = useList({
    resource: "deals",
    pagination: { pageSize: 50 },
  });
  const deals = dealsResponse?.data ?? [];

  const handleCreateDeal = () => {
    router.push(`/${locale}/crm/deals/create`);
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
            {deals.map((deal: any) => (
              <React.Fragment key={deal.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <EditButton hideText recordItemId={deal.id} />
                      <ShowButton hideText recordItemId={deal.id} />
                      <DeleteButton hideText recordItemId={deal.id} />
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        {deal.title}
                        <br />
                        Client: <ClientName clientId={deal.client_id} />
                      </>
                    }
                    secondary={
                      <>
                        Accountable Person:{" "}
                        <ProfileName profileId={deal.profile_id} /><br /> Amount: {deal.amount}<br /> Status:{" "}
                        {deal.status} <br /> Date:{" "}
                        {new Date(deal.deal_date).toLocaleDateString()}
                      </>
                    }
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
