"use client";
import React, { useEffect, useState } from "react";
import { getChatMessages,  } from "@/services/course.service";
import { MessageCircle, ArrowLeft, SendHorizontal } from "lucide-react";

interface ChatMessage {
  id: number;
  message: string;
  created_at: string;
  visibility: string;
  user: string;
  thread_count?: number;
}

interface ThreadMessage extends ChatMessage {
  parent_id: number;
}

interface ChatDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  id: number;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, toggleDrawer, id }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isThreadView, setIsThreadView] = useState(false);
  const [activeThread, setActiveThread] = useState<ChatMessage | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (isOpen) {
        const data = await getChatMessages(id);
        setMessages(data.item_chats);
      }
    };
    fetchMessages();
  }, [isOpen, id]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implement the send message logic here
      setNewMessage("");
    }
  };

  const handleThreadClick = async (message: ChatMessage) => {
    setIsThreadView(true);
    setActiveThread(message);
    try {
      // const threadData = await getItemChatThread(message.id);
      // setThreadMessages(threadData.threads);
    } catch (error) {
      console.error("Failed to fetch thread messages:", error);
    }
  };

  const handleBackToChat = () => {
    setIsThreadView(false);
    setActiveThread(null);
    setThreadMessages([]);
  };

  const MessageView = ({ message, isThread = false }: { message: ChatMessage | ThreadMessage, isThread?: boolean }) => (
    <div
      className={`relative rounded-lg p-3 max-w-xs ${
        message.user === "me" ? "self-end bg-blue-100" : "self-start bg-gray-100"
      }`}
    >
      {message.user !== "me" && (
        <div className="text-sm font-semibold text-gray-600">
          {message.user}
        </div>
      )}
      <div className="mt-1">{message.message}</div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs text-gray-400">
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
        {!isThread && (
          <button
            onClick={() => handleThreadClick(message)}
            className="text-blue-500 hover:text-blue-700 flex items-center text-xs"
          >
            <MessageCircle size={14} className="mr-1" />
            {message.thread_count || 0}
          </button>
        )}
      </div>
      {message.visibility === "teachers" && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
          Teachers Only
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`z-40 fixed right-0 top-0 h-full w-96 bg-white shadow-xl transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
        {isThreadView ? (
          <div className="flex items-center">
            <button
              onClick={handleBackToChat}
              className="mr-2 hover:bg-blue-600 rounded-full p-1"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold">Thread</h2>
          </div>
        ) : (
          <h2 className="text-lg font-bold">Chat</h2>
        )}
        <button
          className="text-2xl cursor-pointer focus:outline-none"
          onClick={toggleDrawer}
        >
          &times;
        </button>
      </div>

      {/* Messages Section */}
      <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-8rem)] space-y-2">
        {isThreadView ? (
          <>
            {activeThread && <MessageView message={activeThread} isThread />}
            <div className="border-b my-4"></div>
            {threadMessages.map((message) => (
              <MessageView key={message.id} message={message} isThread />
            ))}
          </>
        ) : (
          messages.map((message) => (
            <MessageView key={message.id} message={message} />
          ))
        )}
      </div>

      {/* Chat Input Section */}
      <div className="absolute bottom-0 w-full">
        <div className="flex items-center p-4 bg-gray-50 border-t">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={isThreadView ? "Reply in thread..." : "Type a message..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            onClick={handleSendMessage}
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;