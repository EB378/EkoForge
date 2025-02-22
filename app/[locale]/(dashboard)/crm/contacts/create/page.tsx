"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function ContactsCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: "clients",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
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
        <TextField label="Email" {...register("email")} margin="normal" 
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text" />

        <TextField label="Phone" {...register("phone")} margin="normal" 
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text" />
        
        <TextField label="Role" {...register("role")} margin="normal" 
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text" />

      </Box>
    </Create>
  );
}
