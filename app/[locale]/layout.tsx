import { DevtoolsProvider } from "../../providers/devtools";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import BookIcon from '@mui/icons-material/Book';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Groups3Icon from '@mui/icons-material/Groups3';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactsIcon from '@mui/icons-material/Contacts';
import StoreIcon from '@mui/icons-material/Store';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@/contexts/color-mode";
import { authProviderClient } from "@/providers/auth-provider/auth-provider.client";
import { dataProvider } from "@/providers/data-provider";
import type { Viewport } from "next";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://ekoforge.com";

const APP_NAME = "EkoForge";
const APP_DEFAULT_TITLE = "EkoForge";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "EkoForge App";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  metadataBase: new URL(defaultUrl),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  }, // default title
  icons: {
    icon: "/icon.ico",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};


export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang={locale}>
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <NextIntlClientProvider messages={messages}>
                <RefineSnackbarProvider>
                  <DevtoolsProvider>
                    <Refine
                      routerProvider={routerProvider}
                      authProvider={authProviderClient}
                      dataProvider={dataProvider}
                      notificationProvider={useNotificationProvider}
                      resources={[
                        {
                          name: "forge",
                          list: `/${locale}/forge`,
                          meta: {
                            icon: <BroadcastOnHomeIcon />,
                            label: "The Forge",
                          },
                        },
                        {
                          name: "profiles",
                          list: `/${locale}/profile`,
                          edit: `/${locale}/profile/edit/:id`,
                          meta: {
                            icon: <AccountBoxIcon />,
                            label: "Profile",
                          },
                        },

                        {
                          name: "crm",
                          identifier: "crm",
                          meta: {
                            icon: <BookIcon />,
                            label: "CRM",
                          },
                        },

                        {
                          name: "clients",
                          identifier: "dashboard",
                          list: `/${locale}/crm`,
                          create: `/${locale}/crm/clients/create`,
                          edit: `/${locale}/crm/clients/edit/:id`,
                          show: `/${locale}/crm/clients/show/:id`,
                          meta: {
                            canDelete: true,                            
                            label: "Dashboard",
                            parent: "crm",
                            icon: <BarChartIcon />,
                          },
                        },


                        

                        {
                          name: "contacts",
                          list: `/${locale}/crm/contacts`,
                          create: `/${locale}/crm/contacts/create`,
                          edit: `/${locale}/crm/contacts/edit/:id`,
                          show: `/${locale}/crm/contacts/show/:id`,
                          meta: {
                            canDelete: true,
                            label: "Contacts",
                            parent: "crm",
                            icon: <ContactsIcon />,
                          },
                        },
                        {
                          name: "clients",
                          identifier: "clients",
                          list: `/${locale}/crm/clients`,
                          create: `/${locale}/crm/clients/create`,
                          edit: `/${locale}/crm/clients/edit/:id`,
                          show: `/${locale}/crm/clients/show/:id`,
                          meta: {
                            canDelete: true,
                            label: "Clients",
                            parent: "crm",
                            icon: <StoreIcon />,
                          },
                        },
                        {
                          name: "deals",
                          list: `/${locale}/crm/deals`,
                          create: `/${locale}/crm/deals/create`,
                          edit: `/${locale}/crm/deals/edit/:id`,
                          show: `/${locale}/crm/deals/show/:id`,
                          meta: {
                            canDelete: true,
                            parent: "crm",
                            label: "Deals",
                            icon: <HandshakeIcon />,
                          },
                        },
                        {
                          name: "reports",
                          list: `/${locale}/crm/reports`,
                          create: `/${locale}/crm/reports/create`,
                          edit: `/${locale}/crm/reports/edit/:id`,
                          show: `/${locale}/crm/reports/show/:id`,
                          meta: {
                            canDelete: true,
                            parent: "crm",
                            label: "Reports",
                            icon: <AnalyticsIcon />,
                          },
                        },





                        {
                          name: "calendar",
                          list: `/${locale}/calendar`,
                          create: `/${locale}/calendar/create`,
                          edit: `/${locale}/calendar/edit/:id`,
                          show: `/${locale}/calendar/show/:id`,
                          meta: {
                            canDelete: true,
                            icon: <CalendarMonthIcon />,
                            label: "Calendar",
                          },
                        },
                        {
                          name: "resources",
                          list: `/${locale}/resource`,
                          create: `/${locale}/resource/create`,
                          edit: `/${locale}/resource/edit/:id`,
                          show: `/${locale}/resource/show/:id`,
                          meta: {
                            canDelete: true,
                            icon: <LibraryBooksIcon />,
                          },
                        },
                        {
                          name: "ledger",
                          list: `/${locale}/ledger`,
                          create: `/${locale}/ledger/create`,
                          edit: `/${locale}/ledger/edit/:id`,
                          show: `/${locale}/ledger/show/:id`,
                          meta: {
                            canDelete: true,
                            icon: <RequestQuoteIcon />,
                          },
                        },
                        {
                          name: "prospects",
                          list: `/${locale}/prospects`,
                          create: `/${locale}/prospects/create`,
                          edit: `/${locale}/prospects/edit/:id`,
                          show: `/${locale}/prospects/show/:id`,
                          meta: {
                            canDelete: true,
                            icon: <Groups3Icon />,
                          },
                        },
                        {
                          name: "prospects",
                          identifier: "migrate",
                          edit: `/${locale}/migrate/:id`,
                          meta: {
                            hide: true,
                          },
                        },
                      ]}
                      options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                        projectId: "L5lEaP-8nnveC-aoPsCf",
                        title: {
                          text: APP_DEFAULT_TITLE,
                        },
                      }}
                    >
                      {children}
                      <RefineKbar />
                    </Refine>
                  </DevtoolsProvider>
                </RefineSnackbarProvider>
              </NextIntlClientProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
