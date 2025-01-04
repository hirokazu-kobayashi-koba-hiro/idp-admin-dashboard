import { SessionProvider } from "next-auth/react";
import {CssBaseline} from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
          <CssBaseline/>
          <DashboardLayout>
              {children}
          </DashboardLayout>
      </SessionProvider>
      </body>
    </html>
  );
}
