import React from "react";
import Sidebar from "@/components/Course/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";

interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  return (
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
  );
};

export default InnerLayout;