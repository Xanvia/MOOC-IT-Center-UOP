import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

// Define message type
interface Message {
  id: string;
  sender: string; // Changed to support multiple teachers
  content: string;
  timestamp: Date;
}

// Dummy data for initial messages
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Ms. Johnson',
    content: 'Hi John, have you finalized the curriculum for the science fair project?',
    timestamp: new Date('2024-02-15T10:30:00')
  },
  {
    id: '2',
    sender: 'Ms. Johnson',
    content: 'Definitely! I was thinking we could create a more comprehensive rubric this year.',
    timestamp: new Date('2024-02-15T10:40:00')
  },
  {
    id: '3',
    sender: 'Mr. Smith',
    content: 'Great idea. Want to meet in the staff room during lunch to discuss?',
    timestamp: new Date('2024-02-15T10:45:00')
  },
  
  {
    id: '4',
    sender: 'Mr. Smith',
    content: 'Sounds good. See you then!',
    timestamp: new Date('2024-02-15T10:55:00')
  }
];

interface CourseCreatorChatProps {
  initialMessages?: Message[];
  currentUser?: string;
  onSendMessage?: (message: Message) => void;
}

const CourseCreatorChat: React.FC<CourseCreatorChatProps> = ({ 
  initialMessages = DUMMY_MESSAGES, 
  currentUser = 'Mr. Smith', // Default user can be changed
  onSendMessage 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser, // Use the current user's name
      content: newMessage,
      timestamp: new Date()
    };

    // Update local state
    setMessages([...messages, message]);
    
    // Call optional callback for parent component
    onSendMessage?.(message);
    
    // Clear input
    setNewMessage('');
  };

  // Render individual message
  const renderMessage = (message: Message) => {
    const isCurrentUser = message.sender === currentUser;
    return (
      <div 
        key={message.id} 
        className={`flex items-start mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`flex items-start space-x-2 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}
        >
          <div className="rounded-full p-2 bg-gray-200">
            <User size={20} />
          </div>
          <div 
            className={`p-3 rounded-lg max-w-md ${
              isCurrentUser 
                ? 'bg-sky-500 text-white' 
                : 'bg-gray-200 text-black'
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
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 border-b pb-2">
        <MessageSquare className="mr-2" />
        <h2 className="text-xl font-semibold">Course Creator Chat</h2>
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
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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