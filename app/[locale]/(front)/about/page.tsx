"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import NextLink from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { useColorMode } from "@contexts/color-mode";
import { getTheme } from "@theme/theme";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

// Icons
import Navbar from "@components/Front/Navbar";
import Footer from "@components/Front/Footer";

const AboutUs = () => {
  const t = useTranslations("AboutUs");
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  // Framer Motion Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "40vh", sm: "60vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.strong.black,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <NextImage
            src="/about-hero-bg.svg"
            alt="About Us Background"
            fill
            style={{
              objectFit: "cover",
              filter: "brightness(0.3)",
            }}
          />
        </motion.div>
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            px: 2,
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
          >
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.fourth.light,
                fontWeight: "bold",
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                textShadow: "-2px 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {t("title", { defaultValue: "About Us" })}
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                mt: 2,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              {t("subtitle", {
                defaultValue:
                  "We are passionate about innovation, quality, and transforming ideas into reality.",
              })}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <NextLink href="/#contact" passHref>
                <Button
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.5,
                    bgcolor: theme.palette.third.main,
                    color: "#fff",
                    fontWeight: "bold",
                    boxShadow: 3,
                    borderRadius: 2,
                    "&:hover": { bgcolor: theme.palette.third.dark },
                  }}
                >
                  {t("cta", { defaultValue: "Contact Us" })}
                </Button>
              </NextLink>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* About Content Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 4, md: 10 },
        }}
      >
        <Grid container spacing={4}>
          {/* Our Story */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {t("ourStoryTitle", { defaultValue: "Our Story" })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ourStoryText", {
                  defaultValue:
                    "Founded in 2010, our journey started with a vision to revolutionize the industry. Over the years, we have grown into a team of creative professionals, passionate about delivering excellence in every project.",
                })}
              </Typography>
            </motion.div>
          </Grid>
          {/* Our Mission */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} transition={{ delay: 0.2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {t("ourMissionTitle", { defaultValue: "Our Mission" })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ourMissionText", {
                  defaultValue:
                    "Our mission is to empower businesses by providing innovative solutions that drive success. We believe in integrity, creativity, and a commitment to our clients’ growth.",
                })}
              </Typography>
            </motion.div>
          </Grid>
          {/* Our Values */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} transition={{ delay: 0.2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {t("ourValuesTitle", { defaultValue: "Our Values" })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ourValuesText", {
                  defaultValue:
                    "Our mission is to empower businesses by providing innovative solutions that drive success. We believe in integrity, creativity, and a commitment to our clients’ growth.",
                })}
              </Typography>
            </motion.div>
          </Grid>
          {/* Our Philosophy */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} transition={{ delay: 0.2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {t("ourPhilosophyTitle", { defaultValue: "Our Philosophy" })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ourPhilosophyText", {
                  defaultValue:
                    "Our mission is to empower businesses by providing innovative solutions that drive success. We believe in integrity, creativity, and a commitment to our clients’ growth.",
                })}
              </Typography>
            </motion.div>
          </Grid>
          {/* Our Approch */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} transition={{ delay: 0.2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {t("ourApproachTitle", { defaultValue: "Our Approach" })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ourApproachText", {
                  defaultValue:
                    "Our mission is to empower businesses by providing innovative solutions that drive success. We believe in integrity, creativity, and a commitment to our clients’ growth.",
                })}
              </Typography>
            </motion.div>
          </Grid>
          {/* Meet the Team */}
          <Grid item xs={12}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.4 }}>
              <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
                {t("contactTitle", { defaultValue: "Meet the Team" })}
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                {t("contactSubtitle", {
                  defaultValue: "A diverse group of professionals working together to create excellence.",
                })}
              </Typography>
            </motion.div>
            <Grid container spacing={4} justifyContent="center">
              {/* Example Team Member */}
              <Grid item xs={6} sm={4} md={3}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      src="/pfp/eab.png"
                      alt="EAB"
                      sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
                    />
                    <Typography variant="h6">E. A. Benni </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      CEO & Founder
                        <br /> +358442413840
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              {/* Repeat similar Grid items for more team members */}
              <Grid item xs={6} sm={4} md={3}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      src="/"
                      alt="NB"
                      sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
                    />
                    <Typography variant="h6">N. Benni</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Delivery Lead <br/> +358401677836
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
