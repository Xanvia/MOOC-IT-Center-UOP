import React, { useState } from 'react';
import { useGlobal } from "@/contexts/store";
import { MessageCircle, MoreVertical, Reply } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

interface Discussion {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export default function Notifications() {
  const { userRole } = useGlobal();
  const [activeTab, setActiveTab] = useState<'announcements' | 'discussions'>('announcements');
  const [newMessage, setNewMessage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Final Project Due Date Extended',
      content: 'The deadline for the final project has been extended by one week. Please make sure to submit your work by the new deadline.',
      timestamp: '2 days ago'
    }
  ]);
  
  const [discussions, setDiscussions] = useState<Discussion[]>([
    { id: 1, user: 'John Doe', message: 'Has anyone started on the final project?', timestamp: '2 hours ago', isCurrentUser: false },
    { id: 2, user: 'Jane Smith', message: 'Yes, I\'ve begun working on it. The requirements seem challenging!', timestamp: '1 hour ago', isCurrentUser: false },
    { id: 3, user: 'You', message: 'I\'m also working on it. Would anyone like to form a study group?', timestamp: '30 minutes ago', isCurrentUser: true },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setDiscussions([
        ...discussions,
        {
          id: discussions.length + 1,
          user: 'You',
          message: newMessage,
          timestamp: 'Just now',
          isCurrentUser: true
        }
      ]);
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (id: number) => {
    setDiscussions(discussions.filter(discussion => discussion.id !== id));
    setOpenMenuId(null);
  };

  const handleEditMessage = (id: number) => {
    // This is a placeholder for the edit functionality
    console.log('Edit message:', id);
    setOpenMenuId(null);
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handlePostAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      setAnnouncements([
        ...announcements,
        {
          id: announcements.length + 1,
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          timestamp: 'Just now'
        }
      ]);
      setNewAnnouncement({ title: '', content: '' });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'announcements' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'discussions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('discussions')}
          >
            Discussions
          </button>
        </div>
      </div>

      {activeTab === 'announcements' ? (
        <div className="space-y-4">
          {userRole === 'teacher' && (
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement(prev => ({...prev, title: e.target.value}))}
              />
              <textarea
                className="w-full p-2 mb-2 border rounded"
                rows={3}
                placeholder="Announcement content..."
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement(prev => ({...prev, content: e.target.value}))}
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handlePostAnnouncement}
              >
                Post Announcement
              </button>
            </div>
          )}
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 bg-yellow-50 rounded-lg shadow">
              <h3 className="font-bold text-lg">{announcement.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Posted {announcement.timestamp}</p>
              <p>{announcement.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-[600px]">
          <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
            {discussions.map((discussion) => (
              <div 
                key={discussion.id} 
                className={`flex mb-4 ${discussion.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`relative max-w-[70%] p-4 rounded-lg shadow ${
                    discussion.isCurrentUser ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{discussion.user}</span>
                    <span className="text-sm opacity-75">{discussion.timestamp}</span>
                  </div>
                  <p>{discussion.message}</p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button 
                      className="p-1 hover:bg-opacity-20 hover:bg-gray-700 rounded"
                      onClick={() => console.log('Reply to:', discussion.id)}
                    >
                      <Reply size={16} />
                    </button>
                    {discussion.isCurrentUser && (
                      <div className="relative">
                        <button 
                          className="p-1 hover:bg-opacity-20 hover:bg-gray-700 rounded"
                          onClick={() => toggleMenu(discussion.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === discussion.id && (
                          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleEditMessage(discussion.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDeleteMessage(discussion.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex p-4 bg-white rounded-lg shadow">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 flex items-center"
              onClick={handleSendMessage}
            >
              <MessageCircle size={18} className="mr-2" />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}