import { GlobalContextProvider } from "@/contexts/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}
