import { Axis3D } from "lucide-react";
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
      canEdit: ann.canEdit,
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

export const addAnnouncement = async (
  courseId: number,
  title: string,
  content: string
) => {
  try {
    const response = await axiosInstance.post(
      `/course/${courseId}/announcement/`,
      {
        title,
        content,
      }
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteAnnouncement = async (announcementId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/course/announcement/${announcementId}/`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteMessage = async (messageID: number) => {
  try {
    const response = await axiosInstance.delete(
      `/course/message/${messageID}/`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addMessage = async (
  courseId: number,
  content: string,
  visibility: string
) => {
  try {
    const response = await axiosInstance.post(`/course/${courseId}/messages/`, {
      content,
      visibility,
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const getReplies = async (messageId: number) => {
  try {
    const response = await axiosInstance.get(
      `/course/message/${messageId}/reply`
    );
    const replies = response.data.data.threads.map((reply: any) => ({
      id: reply.id,
      user: reply.user,
      content: reply.content,
      timestamp: new Date(reply.time).toLocaleString(),
      isCurrentUser: reply.user === "me", // Adjust as per your authentication logic
    }));
    return replies;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? " Network error");
  }
};

export const addReply = async(messageId: number, content: string) => {
  try {
    const response = await axiosInstance.post(`/course/message/${messageId}/reply`, {
      content,
    });
    
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
}

export const deleteReply = async(replyId:number)=>{
  try{
    const response = await axiosInstance.delete(`/course/reply/${replyId}/`);
    return response.data.data;
  }catch(error:any){
    throw new Error(error.response?.data.message ?? "Network error");
  }
}
