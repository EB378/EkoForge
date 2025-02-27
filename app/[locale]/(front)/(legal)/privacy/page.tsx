"use client";

import React from "react";
import { getTheme } from "@theme/theme";
import { useColorMode } from "@contexts/color-mode";
import { Typography, Box } from "@mui/material";
import Navbar from "@components/Front/Navbar";
import Footer from "@components/Front/Footer";

export default function PrivacyPolicy() {
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          p: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last updated: January 1, 2024
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to our Privacy Policy page. This policy outlines how we collect,
          use, and protect your personal information. By accessing or using our
          services, you agree to the terms outlined in this policy.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" gutterBottom>
          We collect various types of information, including personal data (such as your name,
          email, and contact details) and non-personal data (such as usage statistics and
          preferences). This information helps us provide, maintain, and improve our services.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your information is used to personalize your experience, provide customer support,
          process transactions, and communicate updates about our services. We may also use
          your data for research and analytics to improve our offerings.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Your Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have the right to access, update, and delete your personal information. If you
          have any questions about our privacy practices or wish to exercise your rights, please
          contact us at ekoforge@gmail.com.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          We implement robust security measures to protect your information from unauthorized
          access, alteration, or disclosure.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions or concerns regarding this Privacy Policy, please contact
          us at ekoforge@gmail.com.
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
