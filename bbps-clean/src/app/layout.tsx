import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from "../components/Header"; // Added Header component
import Footer from "../components/Footer"; // Added Footer component

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Big Brother Property Solutions - Professional Cleaning Services",
  description: "We provide professional cleaning solutions for all types of projects! From commercial to residential cleaning, Big Brother Property Solutions is your trusted partner.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f9f8f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header /> {/* Integrating Header component */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* Integrating Footer component */}
      </body>
    </html>
  );
}
