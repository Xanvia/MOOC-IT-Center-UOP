import axiosInstance from "../lib/axiosInstance";

export const getAllStudents = async () => {
  try {
    const { data } = await axiosInstance.get("/admin/students");
    return data.data.students;
  } catch (error) {
    throw error;
  }
};

export const getAllTeachers = async () => {
  try {
    const { data } = await axiosInstance.get("/admin/teachers");
    return data.data.teachers;
  } catch (error) {
    throw error;
  }
};

export const getAllPublishedCourses = async () => {
  try {
    const { data } = await axiosInstance.get("/course/");
    return data.data.courses;
  } catch (error) {
    throw error;
  }
};

export const getAllUnpublishedCourses = async () => {
  try {
    const { data } = await axiosInstance.get("/course/unpublished");
    return data.data.courses;
  } catch (error) {
    throw error;
  }
};

export const publishCourse = async (courseId: number) => {
  try {
    await axiosInstance.put(`/admin/publish/${courseId}/`);
  } catch (error) {
    throw error;
  }
};
