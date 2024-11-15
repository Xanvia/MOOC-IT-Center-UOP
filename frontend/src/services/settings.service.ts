import { Inter } from "next/font/google";
import axiosInstance from "../lib/axiosInstance";

type Permission = {
  id: string;
  label: string;
  checked: boolean;
};

export const getAllCourseTeachers = async (courseId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/course/manage/${courseId}/teachers/`
    );
    return data.data.teachers;
  } catch (error) {
    throw error;
  }
};

export const getTeacherPermissions = async (
  teacherId: string,
  courseId: string
) => {
  try {
    // Fetch teacher-specific permissions for the course
    const response = await axiosInstance.get(
      `/course/manage/${courseId}/get-teacher-permissions/${teacherId}/`
    );
    const teacherPermissions = response?.data?.data?.permissions;
    if (!Array.isArray(teacherPermissions)) {
      throw new Error(
        "Unexpected response structure: 'permissions' array not found"
      );
    }

    // Fetch all possible permissions
    const response2 = await axiosInstance.get("/permissions/");
    const allPermissions = response2?.data;
    if (!Array.isArray(allPermissions)) {
      throw new Error(
        "Unexpected response structure: 'all permissions' array not found"
      );
    }

    // Map all permissions, marking `checked` based on teacher's specific permissions
    const mappedPermissions = allPermissions.map((permission: any) => ({
      ...permission,
      checked: teacherPermissions.includes(permission.label),
    }));

    return mappedPermissions;
  } catch (error) {
    console.error("Error fetching or mapping teacher permissions:", error);
    throw error;
  }
};

export const updatePermissions = async (
  teacherId: string,
  courseId: string,
  updatedPermissions: Permission[]
) => {
  try {
    const permissions = updatedPermissions
      .filter((permission) => permission.checked)
      .map((permission) => permission.label);

    await axiosInstance.put(
      `/course/manage/${courseId}/teacher-permissions/${teacherId}/`,
      {
        permissions,
      }
    );
  } catch (error) {
    console.error("Error updating teacher permissions:", error);
    throw error;
  }
};

export const getCourseStudents = async (courseId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/course/manage/${courseId}/students/`
    );
    return data.data.students;
  } catch (error) {
    throw error;
  }
};

export const getStudetnQuizzes = async (
  studentId: string,
  courseId: string
) => {
  try {
    const response = await axiosInstance.get(
      `/course/manage/${courseId}/quizes/${studentId}/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
