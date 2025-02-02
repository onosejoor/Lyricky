import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { Toast } from "../hooks/Toast";

export const metadata: Metadata = {
  title: "Lyricky | Lyrics Finder",
  description:
    "Are you humming a tune but can’t quite remember the lyrics? Fear not! Lyricky is your trusty sidekick in the lyrical labyrinth. Get the lyrics of your song in a snap!",
  keywords: "lyrics music lyrics-finder",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["poppins", "serif"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden transition-colors dark:!bg-black grid grid-rows-[auto_1fr_auto] min-h-screen ${poppins.variable}  ${roboto.variable} font-roboto`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
