"use client";

import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { useShow } from "@refinedev/core";
import { DateField, MarkdownField, Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useParams } from "next/navigation";

// Inline component to display a client's name based on clientId.
function ClientName({ clientId }: { clientId: string }) {
  const { queryResult } = useShow({
    resource: "clients",
    id: clientId,
    meta: { select: "client" },
    queryOptions: { enabled: !!clientId },
  });
  const clientData = queryResult?.data?.data as { client: string } | undefined;
  return <>{clientData ? clientData.client : "Not Available"}</>;
}

// Inline component to display a profile's full name based on profileId.
function ProfileName({ profileId }: { profileId: string }) {
  const { queryResult } = useShow({
    resource: "profiles",
    id: profileId,
    meta: { select: "fullname" },
    queryOptions: { enabled: !!profileId },
  });
  const profileData = queryResult?.data?.data as { fullname: string } | undefined;
  return <>{profileData ? profileData.fullname : "Not Available"}</>;
}

export default function ShowDeal(): JSX.Element {
  const { queryResult } = useShow({
    meta: { select: "*" },
  });
  const isLoading = queryResult.isLoading;
  const isError = queryResult.isError;

  const deal = queryResult?.data?.data;

  if (isError || !deal) return <Typography>Error loading deal details.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Show isLoading={isLoading}>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <Typography variant="h6">Title</Typography>
          <TextField value={deal.title} />

          <Typography variant="h6">Client</Typography>
          <TextField value={<ClientName clientId={deal.client_id} />} />

          <Typography variant="h6">Accountable Person</Typography>
          <TextField value={<ProfileName profileId={deal.profile_id} />} />

          <Typography variant="h6">Amount</Typography>
          <TextField value={deal.amount} />

          <Typography variant="h6">Status</Typography>
          <TextField value={deal.status} />

          <Typography variant="h6">Deal Date</Typography>
          <DateField value={deal.deal_date} />

          {deal.details && (
            <>
              <Typography variant="h6">Details</Typography>
              <MarkdownField value={deal.details} />
            </>
          )}

          {deal.billing_details && (
            <>
              <Typography variant="h6">Billing Details</Typography>
              <MarkdownField value={deal.billing_details} />
            </>
          )}

          <Typography variant="h6">Created At</Typography>
          <DateField value={deal.created_at} />

          <Typography variant="h6">Updated At</Typography>
          <DateField value={deal.updated_at} />
        </Stack>
      </Show>
    </Box>
  );
}
