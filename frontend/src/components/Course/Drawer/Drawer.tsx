"use client";
import React, { useEffect, useState } from "react";
import { getChatMessages } from "@/services/course.service";

interface ChatMessage {
  id: number;
  message: string;
  created_at: string;
  visibility: string;
  user: string;
}

interface ChatDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  id: number;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, toggleDrawer, id }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat messages when the drawer is opened or the `id` changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (isOpen) {
        const data = await getChatMessages(id);
        setMessages(data.item_chats);
      }
    };
    fetchMessages();
  }, [isOpen, id]);

  // Function to filter messages based on visibility and user role
  const canSeeMessage = (message: ChatMessage) => {
    return message.visibility === "all" || message.user === "me";
  };

  // Handle sending a new message (dummy handler for now)
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implement the send message logic here
      // This would typically involve an API call to save the message
      setNewMessage(""); // Clear the input after sending
    }
  };

  return (
    <div
      className={`z-40 fixed right-0 top-0 h-full w-96 bg-white shadow-xl transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <h2 className="text-lg font-bold">Chat</h2>
        <button
          className="text-2xl cursor-pointer focus:outline-none"
          onClick={toggleDrawer}
        >
          &times;
        </button>
      </div>

      {/* Chat Messages Section */}
      <div className="flex flex-col p-4 overflow-y-auto h-4/5 space-y-2">
        {messages.filter(canSeeMessage).map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-3 max-w-xs ${
              message.user === "me" ? "self-end bg-green-200" : "self-start bg-gray-200"
            }`}
          >
            {/* Only show username if the message is from another user */}
            {message.user !== "me" && (
              <div className="text-sm font-semibold text-gray-600">
                {message.user}
              </div>
            )}
            <div className="mt-1">{message.message}</div>
            <div className="text-xs text-gray-400 text-right mt-1">
              {new Date(message.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Section */}
      <div className="flex items-center p-4 bg-gray-100 border-t">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
