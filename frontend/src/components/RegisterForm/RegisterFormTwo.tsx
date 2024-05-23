"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "../Buttons/SolidButton";
import DropDownCountry from "../DropDown/DropDownCountry";
import DropDownGender from "../DropDown/DropDownGender";
import DropDownInterests from "../DropDown/DropDownInterests";
import DatePicker from "../DropDown/DatePicker";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../components.styles";
import InterestLabel from "../DropDown/InterestLabel";

interface Interest {
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
  const [countryCode, setCountryCode] = useState("+ 94");
  const [country, setCountry] = useState(0);
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);

  const removeItem = (index: number) => {
    setInterests((prevInterests) =>
      prevInterests.filter((_, i) => i !== index)
    );
  };

  const addItem = (newInterest: Interest) => {
    setInterests((prevInterests) => [...prevInterests, newInterest]);
  };

  const handleSubmit = (values: RegistrationFormValues) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="lg:px-10 md:pt-5 grid grid-cols-2 gap-12">
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownCountry addSelection={setCountry} />
            </div>
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownGender />
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <DatePicker />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="phonenumber"
                  type="text"
                  placeholder={countryCode}
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
            <SolidButton text="S U B M I T" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationFormTwo;
