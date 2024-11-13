import axiosInstance from "../lib/axiosInstance";

export const getAllStudents = async () => {
  try {
    const { data } = await axiosInstance.get("/admin/students");
    return data.data.students;
  } catch (error) {
    throw error;
  }
};
