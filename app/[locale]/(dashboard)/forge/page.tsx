"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { getTheme } from "@theme/theme";
import { useColorMode } from "@contexts/color-mode";
import { LineChart } from "@mui/x-charts/LineChart";

// Constants for the VerseOfTheDay
const API_KEY = "061ee58bc62b257d8f1fc4a32716d9bb"; // Replace with your API key from API.Bible.
const BIBLE_ID = "de4e12af7f28f599-01"; // Example Bible ID.
const VERSES: string[] = [
  "JER.29.11",
  "PSA.23.6",
  "1COR.4.4-8",
  "PHP.4.13",
  "JHN.3.16",
  "ROM.8.28",
  "ISA.41.10",
  "PSA.46.1",
  "GAL.5.22-23",
  "HEB.11.1",
  "2TI.1.7",
  "1COR.10.13",
  "PRO.22.6",
  "ISA.40.31",
  "JOS.1.9",
  "HEB.12.2",
  "MAT.11.28",
  "ROM.10.9-10",
  "PHP.2.3-4",
  "MAT.5.43-44",
];

function VerseOfTheDay() {
  const [verseRef, setVerseRef] = useState("");
  const [verseContent, setVerseContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Use the day of the month modulo the length of VERSES to keep the same verse for the day.
  const verseIndex = new Date().getDate() % VERSES.length;
  const verseID = VERSES[verseIndex];

  useEffect(() => {
    async function fetchVerse() {
      try {
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseID}`,
          {
            headers: {
              "api-key": API_KEY,
            },
          }
        );
        const json = await response.json();
        // Optionally, if FUMS is loaded, pass the fumsId.
        if (
          typeof window !== "undefined" &&
          (window as any)._BAPI &&
          (window as any)._BAPI.t
        ) {
          (window as any)._BAPI.t(json.meta.fumsId);
        }
        const passage = json.data.passages[0];
        setVerseRef(passage.reference);
        setVerseContent(passage.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching verse:", error);
        setVerseContent("Error fetching verse.");
        setLoading(false);
      }
    }
    fetchVerse();
  }, [verseID]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Verse of the Day
      </Typography>
      {loading ? (
        <Typography>Loading verse...</Typography>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic", mb: 1 }}>
            {verseRef}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: verseContent }} />
        </>
      )}
    </Box>
  );
}

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 8000 },
  { month: "Aug", sales: 5000 },
  { month: "Sep", sales: 6000 },
  { month: "Oct", sales: 7000 },
  { month: "Nov", sales: 8000 },
  { month: "Dec", sales: 9000 },
];

export default function ForgeDashboard() {
  const t = useTranslations("hompage");
  const locale = useLocale();
  const { mode } = useColorMode();
  const theme = getTheme(mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header / Action Buttons */}
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={2}
        sx={{ mb: 4 }}
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          Onboard New Client
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.third.main }}
        >
          Add New Transaction
        </Button>
        <Button variant="outlined" color="primary">
          View Reports
        </Button>
      </Stack>

      {/* Main Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Sales Overview Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <LineChart
                dataset={salesData}
                series={[
                  {
                    id: "sales",
                    label: "Sales",
                    data: salesData.map((item) => item.sales),
                    dataKey: "sales",
                    color: theme.palette.fifth.main,
                  },
                ]}
                xAxis={[
                  {
                    id: "x-axis-0",
                    scaleType: "band",
                    dataKey: "month",
                  },
                ]}
                tooltip={{}}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Replace Noticeboard with Verse of the Day */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: theme.palette.strong.default,
            }}
          >
            <VerseOfTheDay />
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent transactions available.
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.strong.default }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="body1">
              Total Clients: <strong>125</strong>
            </Typography>
            <Typography variant="body1">
              Monthly Revenue: <strong>$45,000</strong>
            </Typography>
            <Typography variant="body1">
              New Transactions: <strong>25</strong>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
