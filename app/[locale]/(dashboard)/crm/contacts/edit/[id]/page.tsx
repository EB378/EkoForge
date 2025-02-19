"use client";

import React from "react";
import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export default function EditContact() {
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
          label="Client ID"
          {...register("client_id", { required: "Client ID is required" })}
          error={!!errors.client_id}
          helperText={errors.client_id?.message as string | undefined}
        />
        <TextField
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.client_id?.message as string | undefined}
        />
        <TextField label="Email" {...register("email")} />
        <TextField label="Phone" {...register("phone")} />
        <TextField label="Role" {...register("role")} />
      </Box>
    </Edit>
  );
}
