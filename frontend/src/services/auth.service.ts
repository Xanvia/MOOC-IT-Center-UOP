import axiosInstance from "../lib/axiosInstance";
import { CALLBACK_URL } from "@/utils/constants";

interface userData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userRole: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/user/login/", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data.message ?? "Network error";
    throw new Error(errorMessage);
  }
};

export const loginWithGoogle = async (code: string) => {
  try {
    const response = await axiosInstance.post("/user/google-auth/login/", {
      code,
      redirect_uri: CALLBACK_URL || "",
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data.message ?? "Network error";
    throw new Error(errorMessage);
  }
};

export const registerUser = async (values: userData) => {
  try {
    const response = await axiosInstance.post("user/register/", {
      firstname: values.firstName,
      lastname: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      user_type: values.userRole,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const registerWithGoogle = async (code: string, userRole: string) => {
  try {
    const response = await axiosInstance.post("/user/google-auth/", {
      code,
      user_type: userRole,
      redirect_uri: CALLBACK_URL || "",
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
