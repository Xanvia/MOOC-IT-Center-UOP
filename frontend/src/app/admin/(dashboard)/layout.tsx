// src/app/admin/layout.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Home, Users, GraduationCap,Library } from "lucide-react";

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/layout/settings-sidebar"), {
  ssr: false,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
    { icon: Users, label: "Students", href: "/admin/students" },
    {icon: Library, label:"Courses",href:"/admin/courses"}
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
      />
      <div
        className={
          "flex flex-col flex-1 overflow-hidden transition-all duration-300"
        }
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}
