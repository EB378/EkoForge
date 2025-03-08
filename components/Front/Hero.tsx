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
import DoubleArrowSharpIcon from "@mui/icons-material/DoubleArrowSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
    <Box sx={{
      maxHeight: "1200px"
    }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "40vh", md: "92%", lg: "92vh" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          backgroundColor: theme.palette.strong.black,
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 10,
            width: "100%",
            px: { xs: 2, sm: 5 },
            py: { xs: 4, sm: 5, md: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Hero Text */}
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: "50%" },
                mb: { xs: 3, md: 0 },
                px: { xs: 2, md: 7 },
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textSlideIn}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    textAlign: { xs: "left", sm: "left" },
                    color: theme.palette.fourth.light,
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "4rem", md: "5rem", lg: "6rem", xl: "8rem" },
                    pl: { xs: 2, sm: 0,},
                    lineHeight: 1.2,
                    textShadow: "-3px 2px 10px rgba(255, 255, 255, 0.41)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  {t("simple")} <br />
                  {t("elegant")} <br />
                  {t("effective")}
                </Typography>
                <Box sx={{ display: { xs: "block", sm: "none" }}}>
                  <NextImage
                    src="/image (1).svg"
                    alt="Hero Graphic"
                    width={200}
                    height={140}
                    quality={65}
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </Box>
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
                    textAlign: { xs: "center", sm: "left" },
                    mt: 2,
                    fontSize: { xs: "1rem", md: "1.25rem", xl: "1.5rem" },
                    textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  }}
                >
                  {t("HeroSubTitle")}
                </Typography>
                {/* CTA Section */}
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <NextLink href="https://calendly.com/ekoforge" passHref>
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      variant="contained"
                      sx={{
                        mt: 2,
                        px: { xs: 3, md: 4 },
                        py: { xs: 1.5, md: 2 },
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
                </Box>
              </motion.div>
            </Box>
            {/* Hero Graphic */}
            <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, mr: { md: 5 }, maxWidth: "50%" }}>
              <NextImage
                src="/image (1).svg"
                alt="Hero Graphic"
                width={500}
                height={350}
                sizes="100vw"

                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: "contain"
                }}
                quality={65}
                priority
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" }, mr: { md: 5 } }}>
              <NextImage
                src="/image (1).svg"
                alt="Hero Graphic"
                width={500}
                height={350}
                sizes="100vw"

                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: "contain"
                }}
                quality={65}
                priority
              />
            </Box>
          </Box>
          {/* Scroll Indicator */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 5, sm: 5, md: -15 },
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "3rem" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
