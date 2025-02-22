"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
  MarkdownField,
} from "@refinedev/mui";

export default function ProspectShow() {
  const { query } = useShow({
    resource: "prospects",
    meta: { select: "*" },
  });

  const isLoading = query.isLoading;

  const record = query?.data?.data;

  console.log("Fetched prospect data:", record);

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1} sx={{ p: 2 }}>
        <Typography variant="body1" fontWeight="bold">
          Prospect ID
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          Company Name
        </Typography>
        <TextField value={record?.company_name} />

        <Typography variant="body1" fontWeight="bold">
          Contact Name
        </Typography>
        <TextField value={record?.contact_name} />

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <TextField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          Phone
        </Typography>
        <TextField value={record?.phone} />

        <Typography variant="body1" fontWeight="bold">
          Website
        </Typography>
        <TextField value={record?.website} />

        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} />

        <Typography variant="body1" fontWeight="bold">
          Notes
        </Typography>
        <MarkdownField value={record?.notes} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.created_at} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={record?.updated_at} />
      </Stack>
    </Show>
  );
}
