import { SessionProvider } from "next-auth/react";
import {CssBaseline} from "@mui/material";


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
          {children}
      </SessionProvider>
      </body>
    </html>
  );
}
