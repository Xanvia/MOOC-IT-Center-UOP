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
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow p-8">
            <div className="flex flex-1">
              <div style={{ flexShrink: 0 }}>
                <Sidebar />
              </div>
              <div style={{ flexGrow: 1 }}>{children}</div>
            </div>
          </div>
        </div>
      </SelectedTopicProvider>
    </>
  );
};

export default InnerLayout;
