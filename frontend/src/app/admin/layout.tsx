import { useState } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar/Navbar";
import { GlobalContextProvider } from "@/contexts/store";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenEd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Toaster richColors closeButton position="top-right" />

          {children}
        </body>
      </html>
    </GlobalContextProvider>
  );
}

// "use client";
// import React from "react";
// import ChartThree from "../Charts/ChartThree";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
// import MapOne from "../Maps/MapOne";
// import DataStatsOne from "@/components/DataStats/DataStatsOne";
// import ChartOne from "@/components/Charts/ChartOne";

// const ECommerce: React.FC = () => {
//   return (
//     <>
//       <DataStatsOne />

//       <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
//         <ChartOne />
//         <ChartTwo />
//         <ChartThree />
//         <MapOne />
//         <div className="col-span-12 xl:col-span-8">
//           <TableOne />
//         </div>
//         <ChatCard />
//       </div>
//     </>
//   );
// };

// export default ECommerce;
