import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhaseBanner from "@/components/PhaseBanner";
import { ProfileProvider } from "@/components/ProfileProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://setuseva.vercel.app"),
  title: {
    default: "SevaSetu: NGO registration in plain English",
    template: "%s | SevaSetu",
  },
  description:
    "Answer a few questions and get the registrations your NGO needs, in order and in plain English. Independent hackathon prototype.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SevaSetu: NGO registration in plain English",
    description:
      "Answer a few questions and get the registrations your NGO needs, in order and in plain English.",
    siteName: "SevaSetu",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col font-sans">
        <ThemeProvider>
          <ProfileProvider>
            <LanguageProvider>
              <Header />
              <PhaseBanner />
              <main className="flex-1">{children}</main>
              <Footer />
            </LanguageProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
