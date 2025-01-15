"use client";

import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import AuthHandler from "@/app/AuthHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <AuthHandler>{children}</AuthHandler>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
