import React, { useState } from 'react';
import { MessageCircle, ArrowLeft, MoreVertical } from "lucide-react";

interface ThreadMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

interface Discussion {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
  threadCount?: number;
}

export default function ThreadView({
  parentMessage,
  onBack
}: {
  parentMessage: Discussion;
  onBack: () => void;
}) {
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([
    {
      id: 1,
      user: "Alice Cooper",
      message: "This is a great point! Let's discuss it further.",
      timestamp: "1 hour ago",
      isCurrentUser: false
    },
    {
      id: 2,
      user: "You",
      message: "Thanks! I think we should focus on the project requirements first.",
      timestamp: "30 minutes ago",
      isCurrentUser: true
    }
  ]);
  
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleSendThreadMessage = () => {
    if (newThreadMessage.trim()) {
      setThreadMessages([
        ...threadMessages,
        {
          id: threadMessages.length + 1,
          user: 'You',
          message: newThreadMessage,
          timestamp: 'Just now',
          isCurrentUser: true
        }
      ]);
      setNewThreadMessage('');
    }
  };

  const handleDeleteMessage = (id: number) => {
    setThreadMessages(threadMessages.filter(msg => msg.id !== id));
    setOpenMenuId(null);
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Thread</h2>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="font-semibold">{parentMessage.user}</div>
        <div className="text-sm text-gray-500 mb-2">{parentMessage.timestamp}</div>
        <div>{parentMessage.message}</div>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4">
        {threadMessages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`relative max-w-[70%] p-4 rounded-lg shadow ${
                message.isCurrentUser ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{message.user}</span>
                <span className="text-sm opacity-75">{message.timestamp}</span>
              </div>
              <p>{message.message}</p>
              {message.isCurrentUser && (
                <div className="mt-2 flex justify-end">
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-opacity-20 hover:bg-gray-700 rounded"
                      onClick={() => toggleMenu(message.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === message.id && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => {
                            console.log('Edit message:', message.id);
                            setOpenMenuId(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Reply in thread..."
          value={newThreadMessage}
          onChange={(e) => setNewThreadMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendThreadMessage()}
        />
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 flex items-center"
          onClick={handleSendThreadMessage}
        >
          <MessageCircle size={18} className="mr-2" />
          Reply
        </button>
      </div>
    </div>
  );
}