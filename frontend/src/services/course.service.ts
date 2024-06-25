import axiosInstance from "../lib/axiosInstance";
import { CreateCourseData, CourseCreator, CourseData } from "@/components/Course/course.types";

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

export const fetchCourseData = async () => {
  try {
    const response = await axiosInstance.get("/course/");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
