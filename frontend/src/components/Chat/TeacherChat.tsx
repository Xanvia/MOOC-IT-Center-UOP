import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, UserPlus, Search, X } from "lucide-react";

// Define message type
interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

// Define teacher type
interface Teacher {
  id: string;
  name: string;
  department: string;
}

// Dummy messages data
const DUMMY_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Ms. Johnson",
    recipient: "Mr. Smith",
    content:
      "Hi John, have you finalized the curriculum for the science fair project?",
    timestamp: new Date("2024-02-15T10:30:00"),
  },
  {
    id: "2",
    sender: "Mr. Smith",
    recipient: "Ms. Johnson",
    content:
      "Hey Sarah, Im still working on the final details. Do you want to collaborate on the judging criteria?",
    timestamp: new Date("2024-02-15T10:35:00"),
  },
];

interface TeacherChatProps {
  initialMessages?: Message[];
  teachers?: Teacher[];
  currentUser?: string;
  onSendMessage?: (message: Message) => void;
}

const TeacherChat: React.FC<TeacherChatProps> = ({
  initialMessages = DUMMY_MESSAGES,
  currentUser = "Ms. Johnson",
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const [isRecipientModalOpen, setIsRecipientModalOpen] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedRecipient) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      recipient: selectedRecipient,
      content: newMessage,
      timestamp: new Date(),
    };

    // Update local state
    setMessages([...messages, message]);

    // Call optional callback for parent component
    onSendMessage?.(message);

    // Clear input
    setNewMessage("");
  };

  // Filter messages based on current user and selected recipient
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === currentUser && msg.recipient === selectedRecipient) ||
      (msg.sender === selectedRecipient && msg.recipient === currentUser)
  );

  // Render individual message
  const renderMessage = (message: Message) => {
    const isCurrentUser = message.sender === currentUser;
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
              isCurrentUser
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="font-semibold text-sm mb-1">{message.sender}</div>
            <p>{message.content}</p>
            <span className="text-xs opacity-70 block mt-1 text-right">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Recipient Selection */}
      <div className="flex items-center mb-4 border-b pb-2 justify-between">
        <div className="flex items-center">
          <MessageSquare className="mr-2" />
          <h2 className="text-xl font-semibold">Teacher Chat</h2>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4"></div>

      {/* Message Input Area */}
      <div className="mt-4 flex items-center border-t pt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          disabled={!selectedRecipient}
          className={`flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 
            ${!selectedRecipient ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
        <button
          onClick={handleSendMessage}
          disabled={!selectedRecipient}
          className={`bg-cyan-500 text-white p-2 rounded-r-lg hover:bg-cyan-600 transition-colors
            ${!selectedRecipient ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Send size={27} />
        </button>
      </div>
    </div>
  );
};

export default TeacherChat;
