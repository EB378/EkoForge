"use client";

import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

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
  
    const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: "clients",
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          control={control}
          name={"client_id"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...clientAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  clientAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.client ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Client"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.client?.id}
                  helperText={(errors as any)?.client?.id?.message}
                  required
                />
              )}
            />
          )}
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
