"use client";

import React from "react";
import { getTheme } from "@theme/theme";
import { useColorMode } from "@contexts/color-mode";
import { Typography, Button, Box } from "@mui/material";
import Navbar from "@components/Front/Navbar";
import Footer from "@components/Front/Footer";

export default function Terms() {
  
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
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          Last updated: January 1, 2024
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our Terms of Service. These terms govern your use of our website and services. By accessing or using our service, you agree to be bound by these terms. If you do not agree to these terms, please do not use our services.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Use of Our Service
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for your conduct while using the service.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          Users must ensure that any information provided is accurate and up-to-date. You are solely responsible for any activity that occurs under your account, and you agree to notify us immediately of any unauthorized use.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages, or any damages whatsoever arising out of your use of or inability to use our services.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These terms shall be governed and construed in accordance with the laws of the EU, without regard to its conflict of law provisions.
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
