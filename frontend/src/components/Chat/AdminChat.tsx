import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User, Shield } from 'lucide-react';

// Define message type
interface Message {
  id: string;
  sender: 'admin' | 'teacher';
  content: string;
  timestamp: Date;
}

// Dummy data for initial messages
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'teacher',
    content: 'Hi, I wanted to discuss the upcoming science project for my class.',
    timestamp: new Date('2024-02-15T09:30:00')
  },
  {
    id: '2',
    sender: 'admin',
    content: 'Hello! Sure, Im listening. What details would you like to share about the project?',
    timestamp: new Date('2024-02-15T09:35:00')
  },
  {
    id: '3',
    sender: 'teacher',
    content: 'Im planning a environmental sustainability project for my 10th-grade students. I need approval for the budget and resources.',
    timestamp: new Date('2024-02-15T09:40:00')
  },
  {
    id: '4',
    sender: 'admin',
    content: 'That sounds like an excellent initiative. Can you provide me with a detailed project proposal?',
    timestamp: new Date('2024-02-15T09:45:00')
  }
];

interface ChatProps {
  initialMessages?: Message[];
  onSendMessage?: (message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({ 
  initialMessages = DUMMY_MESSAGES, 
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
      sender: 'admin', // In a real app, this would be dynamically set
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
    const isAdmin = message.sender === 'admin';
    return (
      <div 
        key={message.id} 
        className={`flex items-start mb-4 ${isAdmin ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`flex items-start space-x-2 ${isAdmin ? 'flex-row-reverse space-x-reverse' : ''}`}
        >
          <div className="rounded-full p-2 bg-gray-200">
            {isAdmin ? <Shield size={20} /> : <User size={20} />}
          </div>
          <div 
            className={`p-3 rounded-lg max-w-md ${
              isAdmin 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-200 text-black'
            }`}
          >
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
        <h2 className="text-xl font-semibold">Admin-Teacher Chat</h2>
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