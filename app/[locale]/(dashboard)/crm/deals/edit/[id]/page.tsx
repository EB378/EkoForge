"use client";

import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function EditDeal() {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      meta: { select: "*" },
    },
  });

  const dealData = queryResult?.data?.data;

  // Autocomplete for Client
  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: "clients",
    defaultValue: dealData?.client_id,
    meta: { select: "id,client" },
  });

  // Autocomplete for Contact
  const { autocompleteProps: contactAutocompleteProps } = useAutocomplete({
    resource: "contacts",
    defaultValue: dealData?.contact_id,
    meta: { select: "id,name" },
  });

  // Autocomplete for Accountable Person (Profile)
  const { autocompleteProps: profileAutocompleteProps } = useAutocomplete({
    resource: "profiles",
    defaultValue: dealData?.profile_id,
    meta: { select: "id,fullname" },
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Editable Fields */}
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message as string | undefined}
          fullWidth
        />

        <Controller
          control={control}
          name="client_id"
          rules={{ required: "Client is required" }}
          defaultValue={dealData?.client_id || null}
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
          defaultValue={dealData?.contact_id || null}
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
          defaultValue={dealData?.profile_id || null}
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
          fullWidth
        />

        <TextField
          label="Status"
          {...register("status", { required: "Status is required" })}
          error={!!errors.status}
          helperText={errors.status?.message as string | undefined}
          fullWidth
        />

        <TextField
          label="Deal Date"
          type="date"
          {...register("deal_date", { required: "Deal Date is required" })}
          error={!!errors.deal_date}
          helperText={errors.deal_date?.message as string | undefined}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Notes"
          multiline
          rows={4}
          {...register("notes")}
          fullWidth
        />
        
        {/* Read-Only Fields */}
        {dealData?.created_at && (
          <TextField
            label="Created At"
            value={new Date(dealData.created_at).toLocaleString()}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        )}
        {dealData?.updated_at && (
          <TextField
            label="Updated At"
            value={new Date(dealData.updated_at).toLocaleString()}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        )}
      </Box>
    </Edit>
  );
}
