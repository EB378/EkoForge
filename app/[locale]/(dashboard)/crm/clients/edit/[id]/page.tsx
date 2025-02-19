"use client";

import React from "react";
import { Edit } from "@refinedev/mui";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export default function EditClient() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    refineCoreProps: { 
      meta: {
        select: "*",
      },
    },
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <TextField label="Primary Contact" {...register("primary_contact")} />
      </Box>
    </Edit>
  );
}
