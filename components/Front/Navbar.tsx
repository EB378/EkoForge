"use client";

import React, { useState, useContext, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import { ColorModeContext } from "@contexts/color-mode";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

// MUI components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Use the refine navigation hook
// If using refine v4:
// import { useNavigation } from "@pankod/refine-core";
// If using refine v5 or later, use:
import { useNavigation } from "@refinedev/core";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps extends RefineThemedLayoutV2HeaderProps {
  children?: React.ReactNode;
  locale?: string;
}

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const t = useTranslations("NavbarLinks");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { push } = useNavigation();
  const { mode, setMode } = useContext(ColorModeContext);

  // Use window.location to get the current path.
  // (Alternatively, you could use Next.js' usePathname hook.)
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1] || locale || "en"; // Default to 'en'

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    if (newLocale === currentLocale) return;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  // Navigation links for desktop and mobile menus
  const navLinks = [
    { label: t("recource-selction"), href: `/${currentLocale}/#recource-selction` },
    { label: t("contact"), href: `/${currentLocale}/#contact` },
    { label: t("bookDiscoveryFlight"), href: `/${currentLocale}/book` },
    { label: t("members"), href: `/${currentLocale}/members` },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 1,
        }}
      >
        {/* Logo: Clickable area that navigates to home */}
        <Box
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => push(`/${currentLocale}/`)}
        >
          <NextImage
            src="/Logo.png" // Replace with your logo path
            width={60}
            height={20}
            alt="Southern Finland Aircraft Rentals"
          />
        </Box>

        {/* Desktop: Navigation links and language selector */}
        {isLargeScreen ? (
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                onClick={() => push(link.href)}
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  color: "primary.contrastText",
                  transition: "transform 0.3s, background 0.3s",
                  "&:hover": {
                    background: (theme) =>
                      `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <Select
              value={currentLocale}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: 1,
                fontSize: "1rem",
                px: 1,
                py: 0,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                border: `1px solid`,
                borderColor: "secondary.main",
                ".MuiSelect-icon": { color: "primary.contrastText" },
                "&:hover": {
                  borderColor: "secondary.light",
                },
              }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="fi">FI</MenuItem>
            </Select>
          </Box>
        ) : (
          // Mobile: Menu toggle button
          <Box>
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              sx={{ display: { lg: "none" } }}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      {!isLargeScreen && isMobileMenuOpen && (
        <Box
          sx={{
            display: { lg: "none" },
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
            px: 2,
            py: 2,
            flexDirection: "column",
            gap: 2,
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
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                color: "primary.contrastText",
                transition: "transform 0.3s, background 0.3s",
                "&:hover": {
                  background: (theme) =>
                    `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transform: "scale(1.05)",
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
              fontSize: "1rem",
              px: 0.5,
              py: 0.35,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              border: `1px solid`,
              borderColor: "secondary.main",
              ".MuiSelect-icon": { color: "primary.contrastText" },
              "&:hover": {
                borderColor: "secondary.light",
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
