"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "../../Buttons/SolidButton";
import DropDownCountry from "@/components/DropDown/DropDownCountry";
import DropDownGender from "@/components/DropDown/DropDownGender";
import DropDownInterests from "@/components/DropDown/DropDownInterests";
import DatePicker from "@/components/DropDown/DatePicker";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../../components.styles";
import InterestLabel from "@/components/DropDown/InterestLabel";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface Interest {
  id: number;
  label: string;
}

interface Country {
  id: number;
  label: string;
}
interface RegistrationFormValues {
  phonenumber: string;
}

const initialValues: RegistrationFormValues = {
  phonenumber: "",
};

const validationSchema = Yup.object({
  phonenumber: Yup.string().required("This field is required"),
});

const RegistrationFormTwo: React.FC = () => {
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);

  const removeItem = (id: number) => {
    setInterests((prevInterests) => {
      const index = prevInterests.findIndex((interest) => interest.id === id);
      if (index !== -1) {
        return [
          ...prevInterests.slice(0, index),
          ...prevInterests.slice(index + 1),
        ];
      }
      return prevInterests;
    });
  };

  const addItem = (newInterest: Interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.some((interest) => interest.id === newInterest.id)) {
        // If it does, return the previous interests without adding the new one
        return prevInterests;
      } else {
        return [...prevInterests, newInterest];
      }
    });
  };

  const handleSubmit = (values: RegistrationFormValues) => {
    console.log(birthDate);
    const token = Cookies.get("token");
    if (country?.label === undefined) {
      toast.warning("Please select a country");
    } else if (gender === "") {
      toast.warning("Please select a gender");
    } else if (interests.length === 0) {
      toast.warning("Please select an interest");
    } else if (birthDate === null) {
      toast.warning("Please select a birthdate");
    } else {
      const date = new Date(birthDate);
      const formattedDate = date.toLocaleDateString("en-CA");
      axios
        .put(
          `${API_URL}/user/add-user-info/`,
          {
            mobile_number: values.phonenumber,
            country: country.id,
            interests: interests.map((interest) => interest.id),
            gender: gender,
            birth_date: formattedDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.user);
          toast.success(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          const errorMessage = err.response?.data.message ?? "Network error";
          toast.error(errorMessage);
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="md:px-5 lg:px-10 md:pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 xl:gap-8">
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownCountry addSelection={setCountry} />
            </div>
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownGender setGender={setGender} />
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <DatePicker setDate={setBirthDate} />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="phonenumber"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Phone number</label>
                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
              </div>
            </div>
          </div>
          <br />
          <DropDownInterests addSelection={addItem} />

          <div className="flex flex-wrap justify-center gap-4  py-2 md:mx-8 mt-8 mb-2">
            {interests.map((interest) => (
              <InterestLabel
                key={interest.id}
                label={interest.label}
                onRemove={() => removeItem(interest.id)}
              />
            ))}
          </div>
          <div className="lg:pt-10">
            <SolidButton type="submit" text="F I N I S H" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationFormTwo;
