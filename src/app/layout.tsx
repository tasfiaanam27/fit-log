import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout library and fitness planning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} bg-[#0b0d10] text-white`}
      >
        <WorkoutProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="flex-1">
              {children}
            </div>

            <Footer />
          </div>
        </WorkoutProvider>
      </body>
    </html>
  );
}