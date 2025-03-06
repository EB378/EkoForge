"use client";

import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function DealsCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  // Autocomplete hook for Clients
  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: "clients",
  });

  // Autocomplete hook for Contacts
  const { autocompleteProps: contactAutocompleteProps } = useAutocomplete({
    resource: "contacts",
  });

  // Autocomplete hook for Accountable Person (Profiles)
  const { autocompleteProps: profileAutocompleteProps } = useAutocomplete({
    resource: "profiles",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message as string | undefined}
          margin="normal"
          fullWidth
        />

        <Controller
          control={control}
          name="client_id"
          rules={{ required: "Client is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...clientAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
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
                  label="Client"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.client_id}
                  helperText={errors.client_id?.message as string | undefined}
                  required
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="contact_id"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...contactAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                return (
                  contactAutocompleteProps?.options?.find((p) => {
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
                  label="Contact"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.contact_id}
                  helperText={errors.contact_id?.message as string | undefined}
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="profile_id"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...profileAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                return (
                  profileAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.fullname ?? ""
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
                  label="Accountable Person"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.profile_id}
                  helperText={errors.profile_id?.message as string | undefined}
                />
              )}
            />
          )}
        />

        <TextField
          label="Amount"
          type="number"
          {...register("amount", { required: "Amount is required" })}
          error={!!errors.amount}
          helperText={errors.amount?.message as string | undefined}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Status"
          {...register("status", { required: "Status is required" })}
          error={!!errors.status}
          helperText={errors.status?.message as string | undefined}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Deal Date"
          type="date"
          {...register("deal_date", { required: "Deal Date is required" })}
          error={!!errors.deal_date}
          helperText={errors.deal_date?.message as string | undefined}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Notes"
          multiline
          rows={4}
          {...register("notes")}
          margin="normal"
          fullWidth
        />
      </Box>
    </Create>
  );
}
