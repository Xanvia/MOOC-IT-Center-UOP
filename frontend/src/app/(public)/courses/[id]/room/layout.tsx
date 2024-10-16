import React, { useEffect } from "react";
import Sidebar from "@/components/Course/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";


interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  return (
    <>
      
      <SelectedTopicProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow px-8">
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
