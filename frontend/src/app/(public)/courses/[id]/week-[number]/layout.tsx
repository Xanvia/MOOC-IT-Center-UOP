import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default InnerLayout;
