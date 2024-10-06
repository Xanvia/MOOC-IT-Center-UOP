import axiosInstance from "../lib/axiosInstance";
import {
  CreateCourseData,
  UpdateCourseData,
} from "@/components/Course/course.types";
interface TestCase {
  stdin: string;
  expected_output: string;
  marks?: string;
}

export const fetchAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course/");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const fetchMyCourses = async () => {
  try {
    const response = await axiosInstance.get("/course/my-courses/");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createCourse = async (values: CreateCourseData) => {
  try {
    const response = await axiosInstance.post("/course/", {
      name: values.name,
      institution: values.institution,
      category: values.category,
      difficulty: values.difficulty,
      payment_type: values.payment_type,
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

export const addOutcomes = async (courseId: number, outcomes: string[]) => {
  try {
    const response = await axiosInstance.patch(`/course/${courseId}`, {
      outcomes,
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

export const createNote = async (chapterId: string, name: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/week/chapter/${chapterId}/note/`,
      {
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createVideo = async (chapterId: string, name: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/week/chapter/${chapterId}/video/`,
      {
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createQuiz = async (chapterId: string, name: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/week/chapter/${chapterId}/quiz/`,
      {
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createCodingQ = async (chapterId: string, name: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/week/chapter/${chapterId}/code/`,
      {
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createWeek = async (courseId: string, name: string) => {
  try {
    const response = await axiosInstance.post(`/course/${courseId}/week/`, {
      name,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createChapter = async (weekId: string, name: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/week/${weekId}/chapter/`,
      {
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const editNote = async (noteId: number, content: string) => {
  try {
    const response = await axiosInstance.put(
      `/course/week/chapter/note/${noteId}/`,
      {
        content,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const fetchCourseContent = async (courseId: string) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/week/`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteComponent = async (
  componentType: any,
  componentId: string
) => {
  let url = `/course/week`;
  switch (componentType) {
    case "Note":
      url += `/chapter/note/${componentId}/`;
      break;
    case "Chapter":
      url += `/chapter/${componentId}/`;
      break;
    case "Week":
      url += `/${componentId}/`;
      break;
    case "Quiz":
      url += `/chapter/quiz/${componentId}/`;
      break;
    case "Video":
      url += `/chapter/video/${componentId}/`;
      break;
    case "Code":
      url += `/chapter/code/${componentId}/`;
      break;
    default:
      throw new Error("Invalid component type");
  }

  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const uploadVideo = async (file: File, videoId: number) => {
  const formData = new FormData();
  formData.append("video_file", file);

  try {
    const response = await axiosInstance.put(
      `/course/week/chapter/video/${videoId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const createQuizQuestion = async (
  quizId: number,
  text: string,
  questionType: string,
  answers: { text: string; is_correct?: string }[],
  score: number
) => {
  try {
    const response = await axiosInstance.post(
      `/course/quiz/${quizId}/questions/`,
      {
        text,
        question_type: questionType,
        answers,
        score,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const enrollCourse = async (courseId: number) => {
  try {
    const response = await axiosInstance.post(`/course/${courseId}/enroll/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const getProgress = async (courseId: string) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/progress/`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const markAsComplete = async (itemId: string) => {
  try {
    const response = await axiosInstance.patch(
      `/course/component/completed/${itemId}/`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const startComponent = async (componentId: string) => {
  try {
    const response = await axiosInstance.post(
      `/course/component/${componentId}/start/`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addQuizToVideo = async (videoId: number, quizzesData: any) => {
  try {
    const response = await axiosInstance.patch(
      `/course/week/chapter/video/${videoId}/`,
      {
        quizzes: quizzesData,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addDetailsCode = async (
  code_id: number,
  question: string,
  explanation: string,
  test_cases: TestCase[],
  duration: number,
  grading_type: string,
  starter_code: string,
  language: string
) => {
  try {
    const response = await axiosInstance.put(
      `/course/week/chapter/code/${code_id}/`,
      {
        question,
        explanation,
        test_cases,
        duration,
        grading_type,
        starter_code,
        language,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addStarterCode = async (code_id: number, starter_code: string) => {
  try {
    const response = await axiosInstance.put(
      `/course/week/chapter/code/${code_id}/`,
      {
        starter_code,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const submitQuiz = async (
  quizId: number,
  score: number,
  student_answers: any
) => {
  try {
    const response = await axiosInstance.post(
      `/course/quiz/${quizId}/submit/`,
      {
        score,
        student_answers,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const saveCode = async (
  code_id: number,
  code: string,
  grade: number
) => {
  try {
    const response = await axiosInstance.post(
      `/course/code/${code_id}/submit/`,
      {
        code,
        grade,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
