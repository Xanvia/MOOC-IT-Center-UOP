// src/app/admin/layout.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Home, Users, GraduationCap, Library } from "lucide-react";

const HeaderWchat = dynamic(() => import("@/components/layout/HeaderWithoutChat"), {
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
    { icon: Library, label: "Courses", href: "/admin/courses" },
  ];

  // Mock or actual course data
  const courseId = "some-course-id"; // Replace with dynamic course ID logic if needed

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
        <HeaderWchat toggleSidebar={toggleSidebar} courseId={courseId} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}
