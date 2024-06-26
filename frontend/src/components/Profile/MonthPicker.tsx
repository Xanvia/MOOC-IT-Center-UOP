import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  setDate: (date: Date | null) => void;
  initialDate?: Date | null;
  text:string;
}

const MonthPicker = ({ setDate, initialDate,text }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setDate(date);
  };
  return (
    <div className="relative">
      <div className="absolute  z-10 inset-y-1 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg
          className="w-4 h-4 text-primary dark:text-primary"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showMonthYearPicker
        dateFormat="YYYY-MM"
        className="bg-gray-50 px-48 xl:px-20 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 py-1.5 xl:p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-primary dark:text-primary dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholderText={text}
      />
    </div>
  );
};

export default MonthPicker;
