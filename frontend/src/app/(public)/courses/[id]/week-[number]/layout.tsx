import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";

interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  return (
    <SelectedTopicProvider>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </SelectedTopicProvider>
  );
};

export default InnerLayout;
