import React, { useState, useEffect, useRef } from "react";

interface DropDownProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const DropDown: React.FC<DropDownProps> = ({ setFieldValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="flex justify-center pt-2 lg:pt-2" ref={dropdownRef}>
      <h3 className="pt-1  text-xl text-primary font-medium">
        I am a<sup className="text-red-500">*</sup> &nbsp;
      </h3>
      <div>
        <div className="relative">
          <button
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center text-primary">
              <span className="ml-3 block truncate">{selectedOption}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <li
                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  setSelectedOption("Teacher");
                  setIsOpen(false);
                  setFieldValue("userRole", "Teacher");
                }}
              >
                <div className="flex items-center text-primary">
                  <span className="font-normal  ml-3 block truncate">
                    Teacher
                  </span>
                </div>
              </li>
              <li
                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                id="listbox-option-1"
                role="option"
                onClick={() => {
                  setSelectedOption("Student");
                  setIsOpen(false);
                  setFieldValue("userRole", "Student");
                }}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    Student
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
