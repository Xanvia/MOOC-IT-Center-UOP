import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import CloseButton from "@/components/Buttons/CloseButton";
import {
  InputLabelClasses2,
  ModalClassesBG,
  SolidInputFieldClasses,
} from "@/components/components.styles";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import DropDownInstitution from "@/components/DropDown/DropDownUni";
import {
  InputFieldClasses,
  InputInnerDiv,
  InputOuterDiv,
} from "@/components/components.styles";
import Image from "next/image";
import DropDownLevel from "@/components/DropDown/DropDownLevel";
import DropDownInterests from "@/components/DropDown/DropDownInterests";

const DefaultImage = "/images/course-header.jpg";

interface Interest {
  id: number;
  label: string;
}


export default function CourseDescEditModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Interest>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(DefaultImage);

  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    null
  );

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCategoryChange = (value: Interest) => {
    setCategory(value);
  };


  const handleDelete = () => {};

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <EditButtonPrimary text="E D I T" onClick={toggleModal} />

      {isOpen && (
        <div className={ModalClassesBG} onMouseDown={handleInsideClick}>
          <div
            className="bg-white px-8 pt-6 pb-4 grid rounded-lg shadow-lg relative max-w-3xl w-full"
            onMouseDown={handleOutsideClick}
          >
            <CloseButton onClick={toggleModal} />
            <label
              htmlFor="profileImageUpload"
              className="cursor-pointer relative inline-block mx-auto"
            >
              <Image
                src={imagePreviewUrl}
                alt="Header image"
                width={900}
                height={300}
                className="ring-4 ring-primary_light  mt-3"
              />

              <svg
                className="w-12 h-12 text-white absolute top-24 right-80"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 32 32"
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
                className="absolute top-16 right-14"
                data-modal-hide="authentication-modal"
                onClick={() => {}}
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
              initialValues={{
                title: "",
                category: "",
                duration: "",
                description: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Course title is required"),
                category: Yup.string().required("Course category is required"),
                duration: Yup.string().required("Course duration is required"),
                description: Yup.string().required("Description is required"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="col-span-2">
                      <label htmlFor="title" className={InputLabelClasses2}>
                        Course Title
                      </label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className={`${SolidInputFieldClasses} ${
                          formik.touched.title && formik.errors.title
                            ? "border-primary"
                            : ""
                        }`}
                        placeholder="Enter course title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className = "">
                      <label
                        htmlFor="title"
                        className=" text-sm font-semibold text-primary"
                      >
                        Course Category
                      </label>
                      <DropDownInterests
                        addSelection={handleCategoryChange}
                        value="Select Course Category"
                      />
                    </div>
                    <div>
                      <DropDownInstitution
                        label="Institution"
                        addSelection={(value: string) =>
                          setSelectedInstitution(value)
                        }
                        selectedInstitution={selectedInstitution ?? ""}
                      />
                    </div>
                    <div>
                      <DropDownLevel setLevel={(value: string) => {}} />
                    </div>
                    <div>
                      <label htmlFor="duration" className={InputLabelClasses2}>
                        Course Duration
                      </label>
                      <Field
                        type="text"
                        id="duration"
                        name="duration"
                        className={`${SolidInputFieldClasses} ${
                          formik.touched.duration && formik.errors.duration
                            ? "border-primary"
                            : ""
                        }`}
                        placeholder="No of weeks"
                      />
                      <ErrorMessage
                        name="duration"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="col-span-2">
                      <div className={InputOuterDiv}>
                        <div className={`h-20 ${InputInnerDiv} `}>
                          <label
                            htmlFor="description"
                            className={InputLabelClasses2}
                          >
                            Description
                          </label>

                          <Field
                            as="textarea"
                            name="description"
                            className={SolidInputFieldClasses}
                            placeholder=" "
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="top-0 left-0 text-red-600 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 mb-2 col-span-2">
                      <SolidButton
                        type="submit"
                        text="S A V E"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
