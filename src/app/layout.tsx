import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components3/providers";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Uploader with ai!...",
  description: "create and uplaod your videos with ai!..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
