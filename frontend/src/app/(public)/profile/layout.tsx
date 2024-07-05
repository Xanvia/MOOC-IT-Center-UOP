import { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "OpenEd | Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}
