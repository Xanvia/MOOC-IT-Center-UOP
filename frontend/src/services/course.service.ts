import axiosInstance from "../lib/axiosInstance";
import {
  CreateCourseData,
  UpdateCourseData,
} from "@/components/Course/course.types";

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

export const updateCourse = async (
  courseId: number,
  values: UpdateCourseData
) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("category", values.category.toString());
  formData.append("duration", values.duration);
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

export const addDescription = async (courseId: number, description: string) => {
  try {
    const response = await axiosInstance.patch(`/course/${courseId}`, {
      description,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addSpecifications = async (
  courseId: number,
  specifications: string
) => {
  try {
    const response = await axiosInstance.patch(`/course/${courseId}`, {
      specifications,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const uploadImage = async (
  file: File,
  noteId: number
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axiosInstance.post(
      `/course/note/${noteId}/image/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Failed to upload image");
  }
};

export const createNote = async (chapterId: number, content: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/chapter/${chapterId}/note`,
      {
        content,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const editNote = async (noteId: number, content: string) => {
  try {
    const response = await axiosInstance.put(`/course/note/${noteId}`, {
      content,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
