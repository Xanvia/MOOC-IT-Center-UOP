import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "@/utils/constants";

interface Interest {
  id: number;
  label: string;
}

interface Props {
  addSelection: (selection: Interest) => void;
  value: string;
}

const DropDownInterests: React.FC<Props> = ({ addSelection, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [interests, setInterests] = useState<Interest[]>([]);
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
    fetchInterests().then((data) => {
      if (data) {
        setInterests(data);
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInterests = async (): Promise<Interest[]> => {
    try {
      const response = await fetch(`${API_URL}/interests/`);
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data.interests)) {
        return data.data.interests;
      } else {
        console.error("Unexpected response structure:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      return [];
    }
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-white my-1 py-2 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center text-primary justify-center">
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

      {isOpen && interests && Array.isArray(interests) && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-80  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ml-44"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {interests.map((interest) => (
            <li
              key={interest.id}
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
              id={`listbox-option-${interest.id}`}
              role="option"
              onClick={() => {
                setSelectedOption(interest.label);
                addSelection(interest);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center text-primary  justify-start">
                <span className="font-normal  ml-3 block truncate">
                  {interest.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownInterests;
