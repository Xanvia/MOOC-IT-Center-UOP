import axiosInstance from "../lib/axiosInstance";
import {
  EditProfileData,
  WorkData,
  EducationData,
} from "@/components/Profile/types";

export const fetchProfileData = async () => {
  try {
    const response = await axiosInstance.get("/user/profile/");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editUserProfile = async (values: EditProfileData) => {
  const formData = new FormData();
  formData.append("firstname", values.firstName);
  formData.append("lastname", values.lastName);
  formData.append("description", values.description);
  formData.append("headline", values.headline);
  formData.append("mobile_number", values.phoneNumber);
  formData.append("country", values.country.id.toString());
  if (values.birthDate) {
    formData.append("birth_date", values.birthDate.toLocaleDateString("en-CA"));
  }
  if (values.imageFile) {
    formData.append("profile_image", values.imageFile);
  }

  try {
    const response = await axiosInstance.put("/user/profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteProfileImage = async () => {
  try {
    const response = await axiosInstance.patch("/user/profile-image", {}, {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addWorkData = async (values: WorkData) => {
  try {
    const response = await axiosInstance.post("/user/work/", values);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const editWorkData = async (id: number, values: WorkData) => {
  try {
    const response = await axiosInstance.put(`/user/work/${id}/`, values);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteWorkData = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/user/work/${id}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const addEducationData = async (values: EducationData) => {
  try {
    const response = await axiosInstance.post("/user/education/", values);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const editEducationData = async (id: number, values: EducationData) => {
  try {
    const response = await axiosInstance.put(`/user/education/${id}/`, values);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};

export const deleteEducationData = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/user/education/${id}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Network error");
  }
};
