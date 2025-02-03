"use client";

import React, { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// MUI Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import { BorderColor } from "@node_modules/@mui/icons-material";

// Create motion-enabled components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Contact = () => {
  const t = useTranslations("Contact");
  const theme = useTheme();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f1363286-3773-4366-a303-f62f033511e6",
          name: formData.get("name"),
          email: formData.get("email"),
          reason: formData.get("reason"),
        }),
      });

      const result = await response.json();
      if (result.success) alert("Thank you for your submission!");
      else alert("Submission failed. Please try again.");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <MotionBox
      id="contact"
      sx={{
        position: "relative",
        py: 16,
        px: 6,
        background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.primary.dark})`,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Contact Form */}
          <Grid item xs={12} lg={6}>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1 }}
              sx={{
                backgroundColor: alpha(theme.palette.common.white, 0.9),
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                p: 4,
              }}
            >
              <MotionTypography
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.3 }}
                variant="h4"
                align="center"
                sx={{
                  fontWeight: "extrabold",
                  color: theme.palette.grey[800],
                  mb: 3,
                }}
              >
                {t("title")}
              </MotionTypography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="name"
                    label={t("name")}
                    required
                    sx={{
                      // Target the outlined input wrapper
                      "& .MuiOutlinedInput-root": {
                        // Set the border color for the default state
                        "& fieldset": {
                          borderColor: "black",
                        },
                        // When hovering, keep the border black
                        "&:hover fieldset": {
                          borderColor: "secondary.dark",
                        },
                        // When focused, keep the border black
                        "&.Mui-focused fieldset": {
                          borderColor: "primary",
                        },
                        // Set the input text color
                        color: "black",
                      },
                      // Also style the label (if needed)
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                  />
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    name="email"
                    label={t("emailentry")}
                    required
                    sx={{
                      // Target the outlined input wrapper
                      "& .MuiOutlinedInput-root": {
                        // Set the border color for the default state
                        "& fieldset": {
                          borderColor: "black",
                        },
                        // When hovering, keep the border black
                        "&:hover fieldset": {
                          borderColor: "secondary.dark",
                        },
                        // When focused, keep the border black
                        "&.Mui-focused fieldset": {
                          borderColor: "primary",
                        },
                        // Set the input text color
                        color: "black",
                      },
                      // Also style the label (if needed)
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                  />
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="reason"
                    label={t("reason")}
                    required
                    multiline
                    rows={4}
                    sx={{
                      // Target the outlined input wrapper
                      "& .MuiOutlinedInput-root": {
                        // Set the border color for the default state
                        "& fieldset": {
                          borderColor: "black",
                        },
                        // When hovering, keep the border black
                        "&:hover fieldset": {
                          borderColor: "secondary.dark",
                        },
                        // When focused, keep the border black
                        "&.Mui-focused fieldset": {
                          borderColor: "primary",
                        },
                        // Set the input text color
                        color: "black",
                      },
                      // Also style the label (if needed)
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                  />

                </MotionBox>
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      py: 1.5,
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.palette.error.main}, ${theme.palette.error.light})`,
                      color: theme.palette.common.white,
                      fontWeight: "bold",
                      borderRadius: 2,
                      boxShadow: theme.shadows[4],
                      textTransform: "none",
                      transition: "all 0.3s",
                      "&:hover": {
                        opacity: 0.9,
                        background: (theme) =>
                          `linear-gradient(to right, ${theme.palette.error.main}, ${theme.palette.error.light})`,
                      },
                    }}
                  >
                    {t("send")}
                  </Button>
                </MotionBox>
              </Box>
            </MotionBox>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={6}>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1 }}
              sx={{
                textAlign: { xs: "center", lg: "left" },
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "extrabold", color: theme.palette.warning.main }}
              >
                {t("contact information")}
              </Typography>
              <MotionBox
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    gap: 2,
                  }}
                >
                  <PhoneIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
                  <Link
                    href="tel:+358442413840"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      color: theme.palette.text.primary,
                      "&:hover": { color: theme.palette.warning.light },
                    }}
                  >
                    +358 44 2413 840
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    gap: 2,
                  }}
                >
                  <EmailIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
                  <Link
                    href="mailto:ekoforge@gmail.com"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      color: theme.palette.text.primary,
                      "&:hover": { color: theme.palette.warning.light },
                    }}
                  >
                    Air.rentals@gmail.com
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    gap: 2,
                  }}
                >
                  <BusinessIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ fontSize: "1rem", color: theme.palette.text.primary }}>
                    Wing Aviators
                  </Typography>
                </Box>
              </MotionBox>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </MotionBox>
  );
};

export default Contact;
