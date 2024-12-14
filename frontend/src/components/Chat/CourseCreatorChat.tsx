import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { getAdminMessages, sendAdminMessage } from "@/services/admin.service";
import { useParams } from "next/navigation";

// Updated message type to match the incoming data structure
interface Message {
  id: number;
  sender: string;
  message: string;
  date: string;
  course: number;
}

interface CourseCreatorChatProps {
  currentUser?: string;
  onSendMessage?: (message: Message) => void;
}

const CourseCreatorChat: React.FC<CourseCreatorChatProps> = ({
  currentUser = "teacher", // Default user for teacher
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();

  // Scroll to bottom of messages when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now(), // Generate a temporary unique ID
      sender: currentUser,
      message: newMessage,
      date: new Date().toISOString(),
      course: Number(params.courseId) || 0,
    };

    try {
      await sendAdminMessage(
        params.courseId as string,
        newMessage,
        currentUser
      );
      setMessages([...messages, message]);
      onSendMessage?.(message);
    } catch (error) {
      console.error(error);
      return;
    }

    // Clear input
    setNewMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const courseId = params.courseId as string;
        const fetchedMessages = await getAdminMessages(courseId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  const renderMessage = (message: Message) => {
    // Determine if the message is from the current user (teacher)
    const isCurrentUser = message.sender === currentUser;

    // If sender is 'admin', treat it as an incoming message
    const isIncomingMessage = message.sender === "admin";

    return (
      <div
        key={message.id}
        className={`flex items-start mb-4 ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex items-start space-x-2 ${
            isCurrentUser ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <div className="rounded-full p-2 bg-gray-200">
            <User size={20} />
          </div>
          <div
            className={`p-3 rounded-lg max-w-md ${
              isIncomingMessage
                ? "bg-gray-200 text-black"
                : isCurrentUser
                ? "bg-sky-500 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            <div className="font-semibold text-sm mb-1">
              {isIncomingMessage ? "Administrator" : message.sender}
            </div>
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
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map(renderMessage)
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
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
        <button
          onClick={handleSendMessage}
          className="bg-sky-500 text-white p-2 rounded-r-lg hover:bg-sky-700 transition-colors"
        >
          <Send size={27} />
        </button>
      </div>
    </div>
  );
};

export default CourseCreatorChat;
