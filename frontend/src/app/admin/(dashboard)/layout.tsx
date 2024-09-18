"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/settings-sidebar";
import { useState } from "react";
import { Home, Users, GraduationCap, Book } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
    { icon: Book, label: "Courses", href: "/admin/courses" },
    { icon: Users, label: "Students", href: "/admin/students" },
    // { icon: Calendar, label: "Schedule", href: "/schedule" },s
    // { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pass toggleSidebar to Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Pass toggleSidebar to Header */}
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}
