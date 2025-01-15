"use client";
import { useState, useEffect } from "react";
import { Home, Users, GraduationCap, CreditCard } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { isCourseCreator } from "@/services/settings.service";
import { useGlobal } from "@/contexts/store";
import { set } from "jodit/types/core/helpers";

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/layout/settings-sidebar"), {
  ssr: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { setIsCourseCreator } = useGlobal();

  const courseId = params.courseId;

  const navItems = [
    { icon: Home, label: "Dashboard", href: `/settings/${courseId}` },
    {
      icon: GraduationCap,
      label: "Teachers",
      href: `/settings/${courseId}/teachers`,
    },
    { icon: Users, label: "Students", href: `/settings/${courseId}/students` },
    {
      icon: CreditCard,
      label: "Payements",
      href: `/settings/${courseId}/payments`,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await isCourseCreator(courseId as string);
      setIsCourseCreator(res);
    };
    fetchData();
  }, [courseId]);

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
        <Header toggleSidebar={toggleSidebar} courseId={courseId as string} />
        <main className="flex-1 overflow-auto p-4 mt-16">{children}</main>
      </div>
    </div>
  );
}
