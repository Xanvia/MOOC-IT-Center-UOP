import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "@/utils/constants";
import { toast } from "sonner";

interface Props {
  addSelection: (interest: Interest) => void;
}

interface Interest {
  id: number;
  label: string;
}

const DropDownInterests = ({ addSelection }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      console.log(interests)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    fetchInterests().then(setInterests);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInterests = async () => {
    const response = await fetch(`${API_URL}/interests/`);
    const data = await response.json();
    console.log(data.data.interests);
    return data.data.interests;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ... */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-80  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ml-44"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {interests.map((interest) => (
            <li
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
              id={`listbox-option-${interest.id}`}
              role="option"
              onClick={() => {
                setSelectedOption(interest.label);
                addSelection(interest);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center text-primary  justify-center">
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
