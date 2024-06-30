import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "@/utils/constants";
import { Field, ErrorMessage } from "formik";
import {
  InputInnerDiv,
  InputOuterDiv,
  SolidInputFieldClasses,
} from "@/components/components.styles";

interface Institution {
  id: number;
  label: string;
}

interface Props {
  addSelection: (item: string) => void;
  selectedInstitution?: string;
  label: string;
}

const DropDownInstitution = ({
  addSelection,
  selectedInstitution,
  label,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    selectedInstitution ? selectedInstitution : ""
  );
  const [institutions, setInstitutions] = useState<Institution[]>([]);
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
        setInstitutions(data);
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInterests = async (): Promise<Institution[]> => {
    try {
      const response = await fetch(`${API_URL}/institutions/`);
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data.institutions)) {
        return data.data.institutions;
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
      <span className="text-sm font-semibold text-primary ">{label}</span>
      <div>
        <div className={InputInnerDiv}>
          <Field
            type="text"
            name="institution"
            value={selectedOption}
            className={SolidInputFieldClasses}
            placeholder=" "
            onClick={() => setIsOpen(!isOpen)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedOption(e.target.value);
              addSelection(e.target.value);
              if (e.target.value === "") {
                setIsOpen(false);
              } else {
                setIsOpen(true);
              }
            }}
          />
          <ErrorMessage
            name="institution"
            component="div"
            className="top-0 left-0 text-red-600 text-xs"
          />
          {/*} <label className={InputLabel}>Institution</label>*/}
        </div>
      </div>

      {isOpen && institutions && Array.isArray(institutions) && (
        <ul
        className="absolute z-20 mt-1 max-h-48 w-80  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"

          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {institutions.map((institution) => (
            <li
              key={institution.id}
              className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
              id={`listbox-option-${institution.id}`}
              role="option"
              onClick={() => {
                setSelectedOption(institution.label);
                addSelection(institution.label);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center text-primary  justify-start">
                <span className="font-normal  ml-3 block truncate">
                  {institution.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownInstitution;
