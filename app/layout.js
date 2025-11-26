import "./globals.css";
import Header from "./Components/Header"
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

      ><SessionProvider>
          <Header />

          {children}
        </SessionProvider>

      </body>
    </html>
  );
}
