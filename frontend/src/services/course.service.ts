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
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("category", values.category.toString());
  formData.append("duration", values.duration);
  formData.append("description", values.description);
  formData.append("difficulty", values.level);
  if (values.institution) {
    formData.append("institution", values.institution);
  }
  if (values.imageFile) {
    formData.append("header_image", values.imageFile);
  }
  
  try {
    const response = await axiosInstance.put(`/course/${courseId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      
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
