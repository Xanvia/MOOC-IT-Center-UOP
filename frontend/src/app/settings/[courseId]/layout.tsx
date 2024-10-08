'use client';
import { useState } from "react";
import { Home, Users, GraduationCap } from "lucide-react";
import dynamic from 'next/dynamic';

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false
});

const Sidebar = dynamic(() => import("@/components/layout/settings-sidebar"), {
  ssr: false
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const courseID = "1";

  const navItems = [
    { icon: Home, label: "Dashboard", href: `/settings/${courseID}` },
    {
      icon: GraduationCap,
      label: "Teachers",
      href: `/settings/${courseID}/teachers`,
    },
    { icon: Users, label: "Students", href: `/settings/${courseID}/students` },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
      />
      <div className={'flex flex-col flex-1 overflow-hidden transition-all duration-300'}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}