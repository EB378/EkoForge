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
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Hero = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  // Framer-motion animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textSlideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: {xs:"50vh", sm:"30vh", md:"92vh"}, // Fixed hero height
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        background: theme.palette.strong.black,
      }}
    >
      {/* Background Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.strong.black,
        }}
      >
        <NextImage
          src="/hero-background.svg"
          alt="Hero Background"
          fill
          style={{
            objectFit: "cover",
            filter: "brightness(0.65)",
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Content Container */}
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: { md: 5 },
            minHeight: "100%",
          }}
        >
          {/* Hero Text */}
          <Box
            sx={{
              maxWidth: { xs: "90%", md: "50%" },
              textAlign: "left",
              my: { xs: 4, md: 0 },
              pl: { xs: 0, md: 7 },
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textSlideIn}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: theme.palette.fourth.light,
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "5rem", lg: "6rem" },
                  lineHeight: 1.2,
                  textShadow: "-3px 2px 10px rgba(255, 255, 255, 0.41)",
                }}
              >
                {t("simple")}<br/>{t("elegant")}<br/>{t("effective")}
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textSlideIn}
              transition={{ delay: 0.3 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  mt: 2,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                }}
              >
                {t("HeroSubTitle")}
              </Typography>
              {/* CTA Section */}
              <NextLink href={`https://calendly.com/ekoforge`} passHref>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  variant="contained"
                  sx={{
                    px: { xs: 3, md: 3 },
                    py: { xs: 1, md: 2 },
                    mt: 2,
                    bgcolor: theme.palette.third.main,
                    color: "#fff",
                    fontWeight: "bold",
                    boxShadow: 3,
                    border: "2px solid transparent",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      border: "2px solid transparent",
                      transition: "border-color 0.3s",
                      "&:hover": { borderColor: theme.palette.secondary.main },
                    }}
                  />
                  {t("CTA")}
                  <DoubleArrowSharpIcon sx={{ ml: 1, scale: 1.5 }} />
                </Button>
              </NextLink>
            </motion.div>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", bottom: -15, left: "50%", transform: "translateX(-50%)" }}>
          <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "3rem" }}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
