import axiosInstance from "../lib/axiosInstance";

export const getAnnouncements = async (courseId: number) => {
  try {
    const response = await axiosInstance.get(
      `/course/${courseId}/announcement`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const getDiscussions = async (courseId: number) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/messages`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
