"use client";
import React, { useEffect, useState } from "react";
import { useGlobal } from "@/contexts/store";
import { Discussion, Announcement } from "../types";
import {
  addAnnouncement,
  deleteAnnouncement,
  deleteMessage,
  getAnnouncements,
  getDiscussions,
} from "@/services/chat.service";
import { useParams } from "next/navigation";
import DiscussionThread from "./Discussion";
import ThreadView from "./Thread";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface MainChatProps {
  onThreadSelect: (discussion: Discussion) => void;
}

export default function MainChat({ onThreadSelect }: MainChatProps) {
  const { userRole } = useGlobal();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"announcements" | "discussions">(
    "announcements"
  );
  const [newMessage, setNewMessage] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const courseID = Number(params.id);
        if (!isNaN(courseID)) {
          const data = await getAnnouncements(courseID);
          setAnnouncements(data.announcements);
        } else {
          console.error("Invalid course ID");
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    })();
  }, [params.id,reload]);

  useEffect(() => {
    (async () => {
      try {
        const courseID = Number(params.id);
        if (!isNaN(courseID)) {
          const data = await getDiscussions(courseID);
          setDiscussions(data.messages);
        } else {
          console.error("Invalid course ID");
        }
      } catch (error) {
        console.error("Failed to fetch discussions:", error);
      }
    })();
  }, [params.id, reload]);

  const reloadData = () => {
    setReload((prevState) => !prevState);
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessage(id);
      setDiscussions(discussions.filter((discussion) => discussion.id !== id));
      setOpenMenuId(null);
      toast.success("deleted");
    } catch (error: any) {
      console.log("error");
      toast.error(error);
    }
  };

  const handleEditMessage = (id: number) => {
    // Placeholder for edit functionality
    console.log("Edit message:", id);
    setOpenMenuId(null);
  };

  const handleDeleteAnnouncement = async (id: number) => {
    console.log("delete announcement", id);
    try {
      await deleteAnnouncement(id);
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    } catch {
      console.log("error");
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handlePostAnnouncement = async () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      try {
        await addAnnouncement(
          Number(params.id),
          newAnnouncement.title,
          newAnnouncement.content
        );
        reloadData();
        setNewAnnouncement({ title: "", content: "" });
      } catch (error) {
        console.error("Failed to post announcement:", error);
      }
    }
  };

  const handleThreadSelect = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    onThreadSelect(discussion);
  };

  const handleBackFromThread = () => {
    setSelectedDiscussion(null);
  };

  return (
    <div className="space-y-4 h-full">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "announcements"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("announcements")}
        >
          Announcements
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "discussions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="flex flex-col h-full">
          {userRole === "teacher" && (
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <textarea
                className="w-full p-2 mb-2 border rounded"
                rows={3}
                placeholder="Announcement content..."
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handlePostAnnouncement}
              >
                Post Announcement
              </button>
            </div>
          )}
          <div className="flex flex-col space-y-4 overflow-y-auto h-full">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="relative p-4 bg-yellow-50 rounded-lg shadow"
              >
                <h3 className="font-bold text-lg">{announcement.title} {announcement.id}</h3>
                {announcement.canEdit && (
                  <Trash
                    className="absolute top-2 right-2 w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                  />
                )}

                <p className="text-sm text-gray-500 mb-2">
                  Posted {announcement.timestamp}
                </p>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === "discussions" && !selectedDiscussion && (
        <DiscussionThread
          discussions={discussions}
          userRole={userRole || "student"}
          onThreadSelect={handleThreadSelect}
          onDeleteMessage={handleDeleteMessage}
          onEditMessage={handleEditMessage}
          reloadData={reloadData}
        />
      )}

      {/* Thread View */}
      {selectedDiscussion && (
        <ThreadView
          parentMessage={selectedDiscussion}
          onBack={handleBackFromThread}
          userRole={userRole || "student"}
        />
      )}
    </div>
  );
}
