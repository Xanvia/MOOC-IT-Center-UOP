// DiscussionThread.tsx

import React, { useState } from "react";
import { MessageCircle, MoreVertical, Reply } from "lucide-react";
import { Discussion } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface DiscussionThreadProps {
  discussions: Discussion[];
  userRole: string;
  onThreadSelect: (discussion: Discussion) => void;
  onDeleteMessage: (id: number) => void;
  onEditMessage: (id: number) => void;
  onSendMessage: (message: string) => void;
}

interface GroupedMessages {
  date: string;
  messages: Discussion[];
}

export default function DiscussionThread({
  discussions,
  userRole,
  onThreadSelect,
  onDeleteMessage,
  onEditMessage,
  onSendMessage,
}: DiscussionThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Function to determine if the current user can see the message
  const canSeeMessage = (message: Discussion) => {
    if (message.visibility === "teachers") {
      return userRole === "teacher";
    }
    return true;
  };

  // Toggle the dropdown menu for edit/delete options
  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Discussion[]): GroupedMessages[] => {
    const groups: { [key: string]: Discussion[] } = {};

    messages.forEach((message) => {
      const date = dayjs(message.timestamp).format("MMMM D, YYYY");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    // Convert the groups object to an array and sort by date ascending
    return Object.keys(groups)
      .sort((a, b) => dayjs(a).unix() - dayjs(b).unix())
      .map((date) => ({
        date,
        messages: groups[date].sort(
          (a, b) => dayjs(a.timestamp).unix() - dayjs(b.timestamp).unix()
        ),
      }));
  };

  const groupedMessages = groupMessagesByDate(
    discussions.filter(canSeeMessage)
  );

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* Date Separator */}
            <div className="flex justify-center my-4">
              <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                {group.date}
              </span>
            </div>
            {/* Messages */}
            {group.messages.map((discussion) => (
              <div
                key={discussion.id}
                className={`flex ${
                  discussion.isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full max-w-md p-4 rounded-lg shadow-lg ${
                    discussion.isCurrentUser
                      ? "bg-blue-100 text-right"
                      : "bg-white text-left"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {/* User and Content */}
                    <div>
                      <h4 className="font-bold text-blue-700">{discussion.user}</h4>
                      <p className="text-gray-700">{discussion.content}</p>
                      <span className="text-xs text-gray-400">
                        {dayjs(discussion.timestamp).format("h:mm A")}
                      </span>
                    </div>
                    {/* More Options */}
                    {discussion.isCurrentUser && (
                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => toggleMenu(discussion.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === discussion.id && (
                          <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-20">
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => onEditMessage(discussion.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              onClick={() => onDeleteMessage(discussion.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Thread Button */}
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      className="flex items-center text-blue-500 hover:underline text-sm"
                      onClick={() => onThreadSelect(discussion)}
                    >
                      <Reply size={16} className="mr-1" />
                      {/* Always show the reply icon, optionally with thread count badge */}
                      {discussion.threadCount && (
                        <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          {discussion.threadCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex p-4 bg-white border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
  );
}
