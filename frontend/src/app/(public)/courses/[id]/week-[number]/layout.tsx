import React from "react";
import Sidebar from "@/components/Course/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";
import Footer from "@/components/Footer/Footer";

interface InnerLayoutProps {
  children: React.ReactNode;
}

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
  { breadcrumb: "> Basic Web Programming", href: "/courses/1" },
  { breadcrumb: "> Course Room", href: "/courses/1/room" },
];

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <SelectedTopicProvider>
        <div className="flex h-full">
          <Sidebar />
          <div className="ml-64 p-5 w-full">{children}</div>
        </div>
      </SelectedTopicProvider>
    </>
  );
};

export default InnerLayout;
