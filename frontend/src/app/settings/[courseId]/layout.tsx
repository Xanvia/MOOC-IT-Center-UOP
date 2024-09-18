"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/settings-sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pass toggleSidebar to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Pass toggleSidebar to Header */}
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}
