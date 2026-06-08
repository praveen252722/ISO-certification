import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VJ International Certifications",
  description: "ISO certification services in Hyderabad by VJ International Certifications.",
  icons: {
    icon: "/images/brand/vj-international-logo.jpeg",
    shortcut: "/images/brand/vj-international-logo.jpeg",
    apple: "/images/brand/vj-international-logo.jpeg"
  },
  verification: {
    google: "RRt5vK6KHMBiEf0dJA3A_DW2SyNMsT9HbPeQT2uWLKM"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
