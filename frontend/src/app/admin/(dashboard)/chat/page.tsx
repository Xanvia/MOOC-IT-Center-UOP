"use client";
import React, { useEffect, useState } from "react";
import AdminChat from "@/components/Chat/AdminChat";


const ChatPage: React.FC = () => {
  

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        
        <AdminChat />

      </main>
    </div>
  );
};

export default ChatPage;
