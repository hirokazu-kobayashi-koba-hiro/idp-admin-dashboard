import { SessionProvider } from "next-auth/react";
import {CssBaseline} from "@mui/material";
import AuthHandler from "@/app/AuthHandler";

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
          <AuthHandler>
              {children}
          </AuthHandler>
      </SessionProvider>
      </body>
    </html>
  );
}
