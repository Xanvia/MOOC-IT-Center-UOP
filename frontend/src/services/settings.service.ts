import axiosInstance from "../lib/axiosInstance";

export const getAllCourseTeachers = async (courseId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/course/manage/${courseId}/teachers/`
    );
    console.log(data);
    return data.data.teachers;
  } catch (error) {
    throw error;
  }
};
