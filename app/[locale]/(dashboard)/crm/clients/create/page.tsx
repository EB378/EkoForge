"use client";

import React from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField, Select, MenuItem } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function CreateClient() {
  // Initialize the form using refine's useForm hook.
  // Note: We do not pass "resource" here; that is provided to the Create component.
  const {
    saveButtonProps,
    register, 
    handleSubmit,
    control,
    formState: { errors },
    refineCore: { formLoading, onFinish },
  } = useForm({
    refineCoreProps: {
      meta: {
        select: "*",
      },
    },
  });

  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
      resource: "contacts",
    });

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
          <MenuItem value="new deal negotiations">New Deal Negotiations</MenuItem>
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
        <Controller
          control={control}
          name={"primary_contact"}
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
                  })?.name ?? ""
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
                  label={"Primary Contact"}
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
      </Box>
    </Create>
  );
}
