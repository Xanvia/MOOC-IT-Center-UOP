import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User, UserPlus, Search, X } from 'lucide-react';

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

// Dummy teachers data
const DUMMY_TEACHERS: Teacher[] = [
  { id: '1', name: 'Ms. Johnson', department: 'Science' },
  { id: '2', name: 'Mr. Smith', department: 'Mathematics' },
  { id: '3', name: 'Ms. Garcia', department: 'English' },
  { id: '4', name: 'Mr. Lee', department: 'History' },
  { id: '5', name: 'Ms. Patel', department: 'Computer Science' },
  { id: '6', name: 'Dr. Williams', department: 'Physics' },
  { id: '7', name: 'Ms. Rodriguez', department: 'Biology' },
  { id: '8', name: 'Mr. Kim', department: 'Chemistry' }
];

// Dummy messages data
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Ms. Johnson',
    recipient: 'Mr. Smith',
    content: 'Hi John, have you finalized the curriculum for the science fair project?',
    timestamp: new Date('2024-02-15T10:30:00')
  },
  {
    id: '2',
    sender: 'Mr. Smith',
    recipient: 'Ms. Johnson',
    content: 'Hey Sarah, Im still working on the final details. Do you want to collaborate on the judging criteria?',
    timestamp: new Date('2024-02-15T10:35:00')
  }
];

interface TeacherChatProps {
  initialMessages?: Message[];
  teachers?: Teacher[];
  currentUser?: string;
  onSendMessage?: (message: Message) => void;
}

const TeacherChat: React.FC<TeacherChatProps> = ({ 
  initialMessages = DUMMY_MESSAGES, 
  teachers = DUMMY_TEACHERS,
  currentUser = 'Ms. Johnson',
  onSendMessage 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter out the current user from potential recipients
  const availableRecipients = teachers.filter(teacher => teacher.name !== currentUser);

  // Filter recipients based on search term
  const filteredRecipients = availableRecipients.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom of messages when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedRecipient) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      recipient: selectedRecipient,
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

  // Filter messages based on current user and selected recipient
  const filteredMessages = messages.filter(msg => 
    (msg.sender === currentUser && msg.recipient === selectedRecipient) ||
    (msg.sender === selectedRecipient && msg.recipient === currentUser)
  );

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
                ? 'bg-purple-500 text-white' 
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

  // Recipient Selection Modal
  const RecipientModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-5/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <UserPlus className="mr-2" /> Select Recipient
            </h2>
            <button 
              onClick={() => setIsRecipientModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Search teachers by name or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Teacher List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredRecipients.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No teachers found
              </div>
            ) : (
              filteredRecipients.map((teacher) => (
                <button
                  key={teacher.id}
                  onClick={() => {
                    setSelectedRecipient(teacher.name);
                    setIsRecipientModalOpen(false);
                    setSearchTerm(''); // Reset search term
                  }}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{teacher.name}</span>
                    <span className="text-sm text-gray-500">{teacher.department}</span>
                  </div>
                </button>
              ))
            )}
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
        <button 
          onClick={() => setIsRecipientModalOpen(true)}
          className="flex items-center bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <UserPlus className="mr-2" />
          {selectedRecipient ? `Chatting with ${selectedRecipient}` : 'Select Recipient'}
        </button>
      </div>
      
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {!selectedRecipient ? (
          <div className="text-center text-gray-500 py-10">
            Please select a recipient to start chatting
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No messages yet. Start a conversation!
          </div>
        ) : (
          filteredMessages.map(renderMessage)
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
          disabled={!selectedRecipient}
          className={`flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
            ${!selectedRecipient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!selectedRecipient}
          className={`bg-purple-500 text-white p-2 rounded-r-lg hover:bg-purple-600 transition-colors
            ${!selectedRecipient ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Recipient Selection Modal */}
      {isRecipientModalOpen && <RecipientModal />}
    </div>
  );
};

export default TeacherChat;