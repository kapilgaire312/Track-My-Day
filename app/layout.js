import "./globals.css";
import Header from "../Components/Header";
import { SessionProvider } from "next-auth/react";
import { ActivityProvider } from "../Contexts/activityContext";
import { CategoryListProvider } from "../Contexts/categoryContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />

          <ActivityProvider>
            <CategoryListProvider>{children}</CategoryListProvider>
          </ActivityProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
