import React, { useState } from 'react';
import { useGlobal } from "@/contexts/store";

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
}



export default function Notifications() {
  const { userRole } = useGlobal();
  const [activeTab, setActiveTab] = useState<'announcements' | 'discussions'>('announcements');
  const [newMessage, setNewMessage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Final Project Due Date Extended',
      content: 'The deadline for the final project has been extended by one week. Please make sure to submit your work by the new deadline.',
      timestamp: '2 days ago'
    }
  ]);
  
  const [discussions, setDiscussions] = useState<Discussion[]>([
    { id: 1, user: 'John Doe', message: 'Has anyone started on the final project?', timestamp: '2 hours ago' },
    { id: 2, user: 'Jane Smith', message: 'Yes, I\'ve begun working on it. The requirements seem challenging!', timestamp: '1 hour ago' },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setDiscussions([
        ...discussions,
        {
          id: discussions.length + 1,
          user: 'You',
          message: newMessage,
          timestamp: 'Just now'
        }
      ]);
      setNewMessage('');
    }
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
        <div className="space-y-4">
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 bg-gray-50 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{discussion.user}</span>
                <span className="text-sm text-gray-500">{discussion.timestamp}</span>
              </div>
              <p>{discussion.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}