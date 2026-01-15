import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srebi.com"),
  openGraph: {
    type: "website",
    title: "Srebi",
    description: "Insurance readiness reports for incident review.",
    siteName: "Srebi"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-mist-50 text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
