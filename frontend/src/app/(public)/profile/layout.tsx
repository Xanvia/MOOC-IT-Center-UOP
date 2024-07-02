import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar/Navbar";
import clsx from "clsx";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenEd | Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-primary_light")}>
        <Toaster richColors closeButton position="top-right" />
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
