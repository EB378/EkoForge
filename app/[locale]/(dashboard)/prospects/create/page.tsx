"use client";

import React from "react";
import { Edit } from "@refinedev/mui";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EditProspect() {
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
  console.log("queryResult", queryResult);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Prospect Name"
          {...register("company_name", {
            required: "Company name is required",
          })}
          error={!!errors.company_name}
          helperText={errors.company_name?.message as string | undefined}
        />
        <TextField label="Email" {...register("email")} />
        <TextField label="Phone" {...register("phone")} />
        <TextField label="Website" {...register("website")} />
        <TextField label="Primary Contact" {...register("contact_name")} />
        <Controller
          control={control}
          name="status"
          rules={{ required: "This field is required" }}
          defaultValue="1. new"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value="1. new">1. New</MenuItem>
                <MenuItem value="2. contacted">2. Contacted</MenuItem>
                <MenuItem value="3. engaged">3. Engaged</MenuItem>
                <MenuItem value="4. interested">4. Interested</MenuItem>
                <MenuItem value="5. salescall">5. Salescall</MenuItem>
                <MenuItem value="6. qualified">6. Qualified</MenuItem>
                <MenuItem value="7. negotitions">7. Negotitions</MenuItem>
                <MenuItem value="8. signed">8. Signed</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <TextField label="Notes" multiline {...register("notes")} />
      </Box>
    </Edit>
  );
}
