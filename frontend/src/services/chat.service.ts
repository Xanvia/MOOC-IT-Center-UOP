import axiosInstance from "../lib/axiosInstance";
import { mapVisibility } from "./utils";

export const getAnnouncements = async (courseId: number) => {
  try {
    const response = await axiosInstance.get(
      `/course/${courseId}/announcement`
    );
    const announcements = response.data.data.announcements.map((ann: any) => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      timestamp: new Date(ann.time).toLocaleString(),
    }));
    return { announcements };
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const getDiscussions = async (courseId: number) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/messages`);
    const messages = response.data.data.messages.map((msg: any) => ({
      id: msg.id,
      user: msg.user,
      content: msg.content,
      timestamp: new Date(msg.time).toLocaleString(),
      visibility: mapVisibility(msg.visibility),
      isCurrentUser: msg.user === "me", // Adjust as per your authentication logic
      threadCount: msg.threadCount || 0, // Assuming threadCount is provided
    }));
    return { messages };
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
