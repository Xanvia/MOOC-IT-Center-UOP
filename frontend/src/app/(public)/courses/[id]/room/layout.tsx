"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Course/Sidebar/Sidebar";
import { SelectedTopicProvider } from "@/contexts/SidebarContext";

interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <SelectedTopicProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="flex flex-1">
            <Sidebar
              onCollapsedChange={setIsSidebarCollapsed}
              isCollapsed={isSidebarCollapsed}
            />
            <div
              className={`flex-grow transition-all duration-300 ease-in-out ${
                isSidebarCollapsed ? "ml-16" : "ml-[25%]"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </SelectedTopicProvider>
  );
};

export default InnerLayout;
