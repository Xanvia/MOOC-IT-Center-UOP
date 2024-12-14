import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, Shield } from "lucide-react";
import { getAdminMessages, sendAdminMessage } from "@/services/admin.service";
import { useParams } from "next/navigation";

// Define message type
interface Message {
  id: string;
  sender: "admin" | "teacher";
  message: string;
  date: Date;
}

const Chat: React.FC = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    try {
      getAdminMessages(courseId).then((messages) => {
        setMessages(messages);
      });
    } catch (error) {
      console.error(error);
    }
  }, [courseId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: "admin",
      message: newMessage,
      date: new Date(),
    };

    try {
      await sendAdminMessage(courseId, newMessage, "admin");
    } catch (error) {
      console.error(error);
      return;
    }

    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Render individual message
  const renderMessage = (message: Message) => {
    const isTeacherMessage = message.sender === "teacher";
    
    return (
      <div 
        key={message.id} 
        className={`flex items-start mb-4 ${
          isTeacherMessage ? "justify-start" : "justify-end"
        }`}
      >
        <div 
          className={`flex items-start space-x-2 ${
            isTeacherMessage ? "" : "flex-row-reverse space-x-reverse"
          }`}
        >
          <div className="rounded-full p-2 bg-gray-200">
            {isTeacherMessage ? <User size={20} /> : <Shield size={20} />}
          </div>
          <div 
            className={`p-3 rounded-lg max-w-md ${
              isTeacherMessage 
                ? "bg-gray-200 text-black" 
                : "bg-blue-700 text-white"
            }`}
          >
            {isTeacherMessage && (
              <div className="font-semibold text-sm mb-1">Course Creator</div>
            )}
            <p>{message.message}</p>
            <span className="text-xs opacity-70 block mt-1 text-right">
              {new Date(message.date).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 border-b pb-2">
        <MessageSquare className="mr-2" />
        <h2 className="text-xl font-semibold">Messages with Course Creator</h2>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages?.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages?.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="mt-4 flex items-center border-t pt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-700 text-white p-2 rounded-r-lg hover:bg-blue-800 transition-colors"
        >
          <Send size={27} />
        </button>
      </div>
    </div>
  );
};

export default Chat;