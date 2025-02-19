"use client";

import React from "react";
import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";


export default function CreateContact() {
  const {
    saveButtonProps,
    register,
    handleSubmit,
    formState: { errors },
    refineCore: { formLoading, onFinish },
  } = useForm({
    refineCoreProps: {
      meta: {
        select: "*",
      },
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
    </Create>
  );
}
