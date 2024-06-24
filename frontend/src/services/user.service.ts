import axiosInstance from "../lib/axiosInstance";

export const fetchProfileData = async () => {
  try {
    const response = await axiosInstance.get("/user/profile/");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
