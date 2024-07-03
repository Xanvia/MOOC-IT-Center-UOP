import React from "react";
import Sidebar from "@/components/Course/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";

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
        <div className="flex" style={{ height: '100%' }}>
          <div style={{ flexShrink: 0 }}>
            <Sidebar />
          </div>
          <div style={{ flexGrow: 1 }}>
            {children}
          </div>
        </div>
      </SelectedTopicProvider>
    </>
  );
};

export default InnerLayout;