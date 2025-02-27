"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import { useColorMode } from "@contexts/color-mode";

// MUI components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTheme } from "@theme/theme";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// refine navigation hook
import { useNavigation } from "@refinedev/core";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps extends RefineThemedLayoutV2HeaderProps {
  children?: React.ReactNode;
  locale?: string;
}

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const t = useTranslations("NavbarLinks");
  const { mode } = useColorMode();
  const theme = getTheme(mode);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { push } = useNavigation();

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1] || locale || "en";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    if (newLocale === currentLocale) return;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  // Navigation links for desktop and mobile menus
  const navLinks = [
    { label: t("navLink1"), href: `/${currentLocale}/#testimonials` },
    { label: t("navLink2"), href: `/${currentLocale}/#contact` },
   /// { label: t("navLink3"), href: `/${currentLocale}/web` },
    { label: t("navLink4"), href: `https://calendly.com/ekoforge` },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 10000,
        minHeight: {md:"8vh"},
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 1200,
          mx: "auto",
          px: 2,
        }}
      >
        {/* Logo */}
        <Box
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => push(`/${currentLocale}/`)}
        >
          <NextImage
            src="/Logo.svg" // Replace with your logo path
            width={150}
            height={30} // Adjust height to maintain proportions
            alt="Southern Finland Aircraft Rentals"
          />
        </Box>

        {/* Desktop Menu */}
        {isLargeScreen ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                onClick={() => push(link.href)}
                sx={{
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  color: theme.palette.primary.contrastText,
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Select
              value={currentLocale}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: 1,
                fontSize: "0.85rem",
                
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                ".MuiSelect-icon": {
                  color: theme.palette.primary.contrastText,
                  fontSize: "1rem",
                },
                "&:hover": {
                  borderColor: theme.palette.secondary.light,
                },
              }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="fi">FI</MenuItem>
            </Select>
          </Box>
        ) : (
          // Mobile Menu Toggle
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              sx={{ p: 1 }}
            >
              {isMobileMenuOpen ? (
                <CloseIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      {!isLargeScreen && isMobileMenuOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            px: 2,
            py: 2,
            gap: 1,
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.href}
              fullWidth
              onClick={() => {
                push(link.href);
                setIsMobileMenuOpen(false);
              }}
              sx={{
                fontWeight: 500,
                textTransform: "none",
                fontSize: "0.9rem",
                color: theme.palette.common.white,
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.secondary.main,
                },
              }}
            >
              {link.label}
            </Button>
          ))}
          <Select
            value={currentLocale}
            onChange={handleLanguageChange}
            fullWidth
            sx={{
              borderRadius: 1,
              fontSize: "0.9rem",
              px: 1,
              py: 0.5,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              border: `1px solid ${theme.palette.secondary.main}`,
              ".MuiSelect-icon": {
                color: theme.palette.primary.contrastText,
                fontSize: "1rem",
              },
              "&:hover": {
                borderColor: theme.palette.secondary.light,
              },
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="fi">FI</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
