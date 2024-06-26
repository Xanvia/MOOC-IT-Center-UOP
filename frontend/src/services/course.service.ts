import axiosInstance from "../lib/axiosInstance";
import { CreateCourseData, UpdateCourseData } from "@/components/Course/course.types";

export const createCourse = async (values: CreateCourseData) => {
  try {
    const response = await axiosInstance.post("/course/", {
      name: values.name,
      institution: values.institution,
      category: values.category,
      difficulty: values.difficulty,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const updateCourse = async (courseId: number, values: UpdateCourseData) => {
  try {
    const response = await axiosInstance.put(`/course/${courseId}`, {
      name: values.name,
      institution: values.institution,
      category: values.category,
      duration: values.duration,
      description: values.description,
      level: values.level,
      header_image: null,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const fetchCourseData = async (courseId: string) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
