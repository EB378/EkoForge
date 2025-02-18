"use client";

import React from "react";
import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

interface Contact {
  id: string;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function CreateContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<Contact>(); // no resource here

  return (
    <Create resource="contacts">
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
