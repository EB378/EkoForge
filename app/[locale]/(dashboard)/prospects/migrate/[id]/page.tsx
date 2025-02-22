"use client";

import React, { useEffect } from "react";
import { Create } from "@refinedev/mui";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useShow } from "@refinedev/core";
import { useParams } from "next/navigation";

export default function CreateClient() {
  // Get the prospect ID from the route.
  const { id } = useParams();
  const prospectId = Array.isArray(id) ? id[0] : id;

  // Fetch prospect data from the "prospects" resource.
  const { queryResult } = useShow({
    resource: "prospects",
    id: prospectId,
    meta: { select: "*" },
  });

  // Access the prospect record.
  const prospectData = queryResult?.data?.data;

  // Initialize the form for creating a new client (resource: "clients").
  const {
    saveButtonProps,
    register,
    reset,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm({
    refineCoreProps: {
      resource: "clients",
      meta: { select: "*" },
    },
  });

  // When prospectData is available, pre-fill the client form fields.
  useEffect(() => {
    if (prospectData) {
      reset({
        client: prospectData.company_name,
        status: prospectData.status,
        signed_date: prospectData.signed_date,
        email: prospectData.email,
        phone: prospectData.phone,
        website: prospectData.website,
        primary_contact: prospectData.contact_name,
      });
    }
  }, [prospectData, reset]);

  if (queryResult.isLoading) return <div>Loading prospect data...</div>;

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Client Name"
          {...register("client", { required: "Client name is required" })}
          error={!!errors.client}
          helperText={errors.client?.message as string | undefined}
        />
        <Select
          defaultValue=""
          label="Status"
          {...register("status", { required: "Status is required" })}
        >
          <MenuItem value="prospect">Prospect</MenuItem>
          <MenuItem value="outreached">Outreached</MenuItem>
          <MenuItem value="negotiations">Negotiations</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
        <TextField
          label="Signed Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("signed_date")}
        />
        <TextField label="Email" {...register("email")} />
        <TextField label="Phone" {...register("phone")} />
        <TextField label="Website" {...register("website")} />
        <TextField
          label="Primary Contact"
          {...register("primary_contact")}
        />
      </Box>
    </Create>
  );
}
