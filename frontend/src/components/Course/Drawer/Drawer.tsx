// components/ChatDrawer/ChatDrawer.tsx
import React from "react";

interface ChatDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <button
          className="text-2xl cursor-pointer focus:outline-none"
          onClick={toggleDrawer}
        >
          &times;
        </button>
      </div>

      {/* Chat Messages Section */}
      <div className="flex flex-col p-4 overflow-y-auto h-4/5">
        {/* Example chat messages */}
        <div className="self-start bg-gray-200 rounded-lg p-3 mb-2 max-w-xs">
          Hello! Does anyone have a question?
        </div>
        <div className="self-end bg-green-200 rounded-lg p-3 mb-2 max-w-xs">
          Yes, I need help with this note.
        </div>
      </div>

      {/* Chat Input Section */}
      <div className="flex items-center p-4 bg-gray-100 border-t">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
