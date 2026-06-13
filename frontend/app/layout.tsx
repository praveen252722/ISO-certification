import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VJ International Certifications | ISO Certification Services",
  description:
    "VJ International Certifications provides professional ISO certification services in Hyderabad. Specializing in ISO 9001, ISO 14001, ISO 45001, ISO 22000, ISO 27001, CE marking, and Halal certification with expert audit coordination and certificate verification.",
  keywords: [
    "ISO certification",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO 22000",
    "ISO 27001",
    "CE marking",
    "Halal certification",
    "VJ International Certifications",
    "Hyderabad",
  ],
  authors: [{ name: "VJ International Certifications" }],
  icons: {
    icon: "/images/brand/vj-international-logo.jpeg",
    shortcut: "/images/brand/vj-international-logo.jpeg",
    apple: "/images/brand/vj-international-logo.jpeg",
  },
  verification: {
    google: "RRt5vK6KHMBiEf0dJA3A_DW2SyNMsT9HbPeQT2uWLKM",
  },
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
