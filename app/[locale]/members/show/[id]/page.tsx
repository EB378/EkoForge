"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
  MarkdownField,
} from "@refinedev/mui";

export default function LogbookShow() {
  const { query } = useShow({
    resource: "logbook", // use the logbook resource
    meta: { select: "*" },
  });

  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Log ID
        </Typography>
        <TextField value={record?.logid} />

        <Typography variant="body1" fontWeight="bold">
          UUID
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          Resource
        </Typography>
        <TextField value={record?.resource} />

        <Typography variant="body1" fontWeight="bold">
          Date
        </Typography>
        <DateField value={record?.date} />

        <Typography variant="body1" fontWeight="bold">
          Pilot in Command
        </Typography>
        <TextField value={record?.pic} />

        <Typography variant="body1" fontWeight="bold">
          Passengers
        </Typography>
        <TextField value={record?.pax} />

        <Typography variant="body1" fontWeight="bold">
          Departure
        </Typography>
        <TextField value={record?.departure} />

        <Typography variant="body1" fontWeight="bold">
          Arrival
        </Typography>
        <TextField value={record?.arrival} />

        <Typography variant="body1" fontWeight="bold">
          Offblock
        </Typography>
        <DateField value={record?.offblock} />

        <Typography variant="body1" fontWeight="bold">
          Takeoff
        </Typography>
        <DateField value={record?.takeoff} />

        <Typography variant="body1" fontWeight="bold">
          Landing
        </Typography>
        <DateField value={record?.landing} />

        <Typography variant="body1" fontWeight="bold">
          Onblock
        </Typography>
        <DateField value={record?.onblock} />

        <Typography variant="body1" fontWeight="bold">
          Landings
        </Typography>
        <TextField value={record?.landings} />

        <Typography variant="body1" fontWeight="bold">
          Flight Rules
        </Typography>
        <TextField value={record?.flightrules} />

        <Typography variant="body1" fontWeight="bold">
          Fuel
        </Typography>
        <TextField value={record?.fuel} />

        <Typography variant="body1" fontWeight="bold">
          Flight Type
        </Typography>
        <TextField value={record?.flight_type} />

        <Typography variant="body1" fontWeight="bold">
          Details
        </Typography>
        <MarkdownField value={record?.details} />

        <Typography variant="body1" fontWeight="bold">
          Billing Details
        </Typography>
        <TextField value={record?.billing_details} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.created_at} />
      </Stack>
    </Show>
  );
}
