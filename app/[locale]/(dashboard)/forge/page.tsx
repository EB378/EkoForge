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

// =============================================================================
// Bible Verse Generation Logic
// =============================================================================

// Define a Book interface with its name and an array of chapter verse counts.
interface Book {
  name: string;
  chapters: number[];
}

// Complete data for all 66 books (Protestant canon).
const bibleBooks: Book[] = [
  { name: "GEN", chapters: [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26] },
  { name: "EXO", chapters: [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38] },
  { name: "LEV", chapters: [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34] },
  { name: "NUM", chapters: [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,39,17,54,42,56,29,34,13] },
  { name: "DEU", chapters: [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12] },
  { name: "JOS", chapters: [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33] },
  { name: "JDG", chapters: [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31] },
  { name: "RUT", chapters: [22,23,18,22] },
  { name: "1SAM", chapters: [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,49,26,36,20,47,40] },
  { name: "2SAM", chapters: [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25] },
  { name: "1KGS", chapters: [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53] },
  { name: "2KGS", chapters: [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30] },
  { name: "1CHR", chapters: [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30] },
  { name: "2CHR", chapters: [18,17,18,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23] },
  { name: "EZRA", chapters: [11,70,13,24,17,22,28,36,15,44] },
  { name: "NEH", chapters: [11,20,32,23,19,19,73,18,38,39,36,47,31] },
  { name: "EST", chapters: [22,23,15,17,14,14,10,17,32,3] },
  { name: "JOB", chapters: [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17] },
  { name: "PSA", chapters: [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6] },
  { name: "PRO", chapters: [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31] },
  { name: "ECC", chapters: [12,17,8,17,10,12,29,17,18,20,10,14] },
  { name: "SNG", chapters: [17,17,11,16,16,13,13,14] },
  { name: "ISA", chapters: [66,13,24,21,29,22,25,28,13,19,27,31,25,30,26,33,24,20,29,24,28,27,18,22,13,21,26,18,32,3,15,20,6,14,23,25,18,23,12,17,13,12,21,14,21,22,11,12,19,12,25] },
  { name: "JER", chapters: [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34] },
  { name: "LAM", chapters: [22,22,66,22,22] },
  { name: "EZK", chapters: [28,23,26,21,27,27,25,27,27,21,23,15,18,23,12,17,13,21,11,15,15,27,18,22,23,28,23,12,17,12,15,21,27,18,22,18,22,22,21,22,11,12,19,12] },
  { name: "DAN", chapters: [21,49,30,37,31,28,28,27,27,21,45,13] },
  { name: "HOS", chapters: [11,23,5,19,15,11,16,14,17,15,12,14,16,9] },
  { name: "JOL", chapters: [20,32,21] },
  { name: "AMO", chapters: [15,16,15,13,27,14,17,14,15] },
  { name: "OBA", chapters: [21] },
  { name: "JON", chapters: [17,10,10,11] },
  { name: "MIC", chapters: [16,13,12,13,15,16,20] },
  { name: "NAM", chapters: [15,13,19] },
  { name: "HAB", chapters: [17,20,19] },
  { name: "ZEP", chapters: [18,15,20] },
  { name: "HAG", chapters: [15,23] },
  { name: "ZEC", chapters: [21,13,10,14,11,15,14,23,17,12,17,14,9,21] },
  { name: "MAL", chapters: [14,17,18,6] },
  { name: "MAT", chapters: [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20] },
  { name: "MRK", chapters: [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20] },
  { name: "LUK", chapters: [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53] },
  { name: "JHN", chapters: [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25] },
  { name: "ACT", chapters: [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31] },
  { name: "ROM", chapters: [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27] },
  { name: "1COR", chapters: [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24] },
  { name: "2COR", chapters: [24,17,18,18,21,18,16,24,15,18,33,21,14] },
  { name: "GAL", chapters: [24,21,29,31,26,18] },
  { name: "EPH", chapters: [23,22,21,32,33,24] },
  { name: "PHP", chapters: [30,30,21,23] },
  { name: "COL", chapters: [29,23,25,18] },
  { name: "1THES", chapters: [10,20,13,18,28] },
  { name: "2THES", chapters: [12,17,18] },
  { name: "1TIM", chapters: [20,15,16,16,25,21] },
  { name: "2TIM", chapters: [18,26,17,22] },
  { name: "TITUS", chapters: [16,15,15] },
  { name: "PHLM", chapters: [25] },
  { name: "HEB", chapters: [14,18,19,16,14,20,28,13,28,39,40,29,25] },
  { name: "JAS", chapters: [27,26,18,17] },
  { name: "1PET", chapters: [25,25,22,19,14] },
  { name: "2PET", chapters: [21,22,18] },
  { name: "1JOHN", chapters: [10,29,24,21,21] },
  { name: "2JOHN", chapters: [13] },
  { name: "3JOHN", chapters: [15] },
  { name: "JUD", chapters: [25] },
  { name: "REV", chapters: [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21] },
];

// Generates a complete list of every verse reference (e.g. "GEN.1.1") in the Bible.
function generateAllVerses(): string[] {
  const verses: string[] = [];
  for (const book of bibleBooks) {
    for (let chapter = 0; chapter < book.chapters.length; chapter++) {
      for (let verse = 1; verse <= book.chapters[chapter]; verse++) {
        verses.push(`${book.name}.${chapter + 1}.${verse}`);
      }
    }
  }
  return verses;
}

// Groups consecutive verses (within the same chapter) into ranges of up to 3 verses.
// For example, if GEN.1.1, GEN.1.2, GEN.1.3 are consecutive, they become "GEN.1.1-3".
function groupVerses(verses: string[]): string[] {
  const grouped: string[] = [];
  let i = 0;
  while (i < verses.length) {
    const current = verses[i];
    const [book, chapter, verseStr] = current.split(".");
    let startVerse = parseInt(verseStr);
    let endVerse = startVerse;
    let count = 1;
    while (i + 1 < verses.length && count < 3) {
      const next = verses[i + 1];
      const [nextBook, nextChapter, nextVerseStr] = next.split(".");
      if (nextBook === book && nextChapter === chapter && parseInt(nextVerseStr) === endVerse + 1) {
        endVerse++;
        count++;
        i++;
      } else {
        break;
      }
    }
    if (startVerse === endVerse) {
      grouped.push(`${book}.${chapter}.${startVerse}`);
    } else {
      grouped.push(`${book}.${chapter}.${startVerse}-${endVerse}`);
    }
    i++;
  }
  return grouped;
}

const ALL_VERSES = generateAllVerses();
const GROUPED_VERSES = groupVerses(ALL_VERSES);

console.log("Total verses:", ALL_VERSES.length);
console.log("Grouped verses count:", GROUPED_VERSES.length);

// =============================================================================
// Existing Dashboard & Verse of the Day Components
// =============================================================================

// Constants for the VerseOfTheDay API call.
const API_KEY = "061ee58bc62b257d8f1fc4a32716d9bb"; // Replace with your API key.
const BIBLE_ID = "de4e12af7f28f599-01"; // Example Bible ID.
// A sample array of verse references (could be replaced by GROUPED_VERSES if desired)
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

  // Use the day of the month modulo the length of VERSES to select a verse for the day.
  const verseIndex = new Date().getDate() % VERSES.length;
  const verseID = VERSES[verseIndex];

  useEffect(() => {
    async function fetchVerse() {
      try {
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseID}`,
          {
            headers: { "api-key": API_KEY },
          }
        );
        const json = await response.json();
        // If a global _BAPI object exists, pass the fumsId.
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

        {/* Verse of the Day */}
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
