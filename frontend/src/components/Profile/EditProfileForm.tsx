"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputFieldClasses,
  InputInnerDiv,
  InputOuterDiv,
  InputLabel,
} from "../components.styles";
import DropDownCountry from "@/components/DropDown/DropDownCountry";
import ReactDatePicker from "@/components/DropDown/DatePicker";
import SolidButton from "../Buttons/SolidButton";
import { ProfileData, EditProfileData, Country } from "./types";
import { toast } from "sonner";
import { editUserProfile, deleteProfileImage } from "@/services/user.service";

const DefaultProfileImage = "/images/52.jpg";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  phoneNumber: Yup.string().required("Phone number is Required"),
});

interface Props {
  userData: ProfileData;
  reloadData: () => void;
}
interface EditFromValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
}

const EditProfileForm: React.FC<Props> = ({ userData, reloadData }) => {
  const [country, setCountry] = useState<Country | undefined>(userData.country);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    userData.profile_image || userData.profile_picture || DefaultProfileImage
  );

  const [birthDate, setBirthDate] = useState<Date | null>(
    new Date(userData.birth_date)
  );

  const initialValues = {
    firstName: userData.firstname || "",
    lastName: userData.lastname || "",
    email: userData.email || "",
    phoneNumber: userData.mobile_number || "",
    description: userData.description || "",
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteProfileImage();
      toast.success(res.message);
      reloadData();
    } catch (error: any) {
      const errorMessage = error.message ?? "Network error";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values: EditFromValues) => {
    try {
      if (!country?.label) {
        toast.warning("Please select a country");
        return;
      }
      if (!birthDate) {
        toast.warning("Please select a birthdate");
        return;
      }
      const editProfileData: EditProfileData = {
        firstName: values.firstName,
        lastName: values.lastName,
        description: values.description,
        phoneNumber: values.phoneNumber,
        country: country,
        birthDate: birthDate,
        imageFile: imageFile,
      };
      const res = await editUserProfile(editProfileData);
      toast.success(res.message);
      reloadData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid">
      <label
        htmlFor="profileImageUpload"
        className="cursor-pointer relative inline-block mx-auto"
      >
        <Image
          src={imagePreviewUrl}
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full ring-4 ring-primary_light mx-auto mt-6"
        />

        <svg
          className="w-12 h-12 text-gray-300  absolute top-20 right-8"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <input
        id="profileImageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <div>
        <button
          type="button"
          className="absolute top-20 right-44"
          data-modal-hide="authentication-modal"
          onClick={handleDelete}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="pt-8 grid grid-cols-1 gap-4 mx-4">
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  type="text"
                  name="firstName"
                  className={InputFieldClasses}
                  placeholder=" "
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
                <label className={InputLabel}>First Name</label>
              </div>
            </div>
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  type="text"
                  name="lastName"
                  className={InputFieldClasses}
                  placeholder=" "
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
                <label className={InputLabel}>Last Name</label>
              </div>
            </div>
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  type="email"
                  name="email"
                  className={InputFieldClasses}
                  placeholder=" "
                  disabled
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
                <label className={InputLabel}>Email</label>
              </div>
            </div>
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  type="text"
                  name="phoneNumber"
                  className={InputFieldClasses}
                  placeholder=" "
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
                <label className={InputLabel}>Phone Number</label>
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownCountry
                addSelection={setCountry}
                selectedCountry={country}
              />
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <ReactDatePicker
                  setDate={setBirthDate}
                  initialDate={birthDate}
                />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={`h-20 ${InputInnerDiv} `}>
                <Field
                  as="textarea"
                  name="description"
                  className={InputFieldClasses}
                  placeholder=" "
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
                <label className={InputLabel}>Description</label>
              </div>
            </div>
          </div>
          <div className="px-14 pt-10">
            <SolidButton type="submit" text="S U B M I T" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfileForm;
