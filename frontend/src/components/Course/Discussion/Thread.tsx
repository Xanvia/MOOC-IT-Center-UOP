"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowLeft, MoreVertical } from "lucide-react";
import { Discussion, ThreadMessage } from "../types";
import { toast } from "sonner";
import { addMessage, addReply, getReplies } from "@/services/chat.service";

interface ThreadViewProps {
  parentMessage: Discussion;
  onBack: () => void;
  userRole: string;
}

export default function ThreadView({
  parentMessage,
  onBack,
  userRole,
}: ThreadViewProps) {
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([]);
  const [newThreadMessage, setNewThreadMessage] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);

  const handleSendThreadMessage = async () => {
    if (newThreadMessage.trim()) {
      try {
        await addReply(parentMessage.id, newThreadMessage);
        reloadData();
        setNewThreadMessage("");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteMessage = (id: number) => {
    setThreadMessages(threadMessages.filter((msg) => msg.id !== id));
    setOpenMenuId(null);
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const data = await getReplies(parentMessage.id);
        setThreadMessages(data);
      } catch (error: any) {
        // Handle error if needed
      }
    };

    fetchReplies();
  }, [parentMessage.id, reload]);

  const reloadData = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col h-full">
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
        <div className="text-sm text-gray-500 mb-2">
          {parentMessage.timestamp}
        </div>
        <div>{parentMessage.content}</div>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {threadMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col space-y-1 ${
                message.isCurrentUser ? "text-right" : "text-left"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {message.user} • {message.timestamp}
                </span>
                {message.visibility === "teachers" && (
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                    Teachers Only
                  </span>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <p
                  className={`inline-block px-3 py-2 rounded-lg ${
                    message.isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } ${
                    message.visibility === "teachers" && userRole !== "teacher"
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  {message.content}
                </p>
                {message.isCurrentUser && (
                  <div className="relative">
                    <button
                      className="hover:text-gray-700"
                      onClick={() => toggleMenu(message.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === message.id && (
                      <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-20">
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => {
                            console.log("Edit message:", message.id);
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
          placeholder="Reply in thread..."
          value={newThreadMessage}
          onChange={(e) => setNewThreadMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendThreadMessage()}
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
