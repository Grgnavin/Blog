import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Import DM Sans from next/font/google
import localFont from "next/font/local";
import "./globals.css";
import ClientSessionProvider from "./ClientSideProvider";
import { Toaster } from "@/components/ui/toaster";

// Import DM Sans
const dmSans = DM_Sans({
  weight: ["400", "700"], // Choose the weights you need
  style: ["normal", "italic"], // Choose the styles you need
  subsets: ["latin"], // Add subsets (like latin or cyrillic) as needed
  variable: "--font-dm-sans", // CSS variable for DM Sans
});

// Other fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App for Builders Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
