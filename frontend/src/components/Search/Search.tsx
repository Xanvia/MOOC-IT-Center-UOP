"use client";
import { searchCourses } from "@/services/course.service";
import React, { useState } from "react";

interface SearchProps {
  setCourses: React.Dispatch<React.SetStateAction<any[]>>;
}

const Search: React.FC<SearchProps> = ({ setCourses }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery: string) => {
    try {
      const data = await searchCourses(searchQuery);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const debounceTimeout = setTimeout(() => handleSearch(value), 300); // Debounce API call
      return () => clearTimeout(debounceTimeout);
    } else {
      // Reset to show all courses if query is cleared
      const fetchAllCourses = async () => {
        try {
          const data = await searchCourses(""); // Adjust API to return all courses when search query is empty
          setCourses(data.courses);
        } catch (error) {
          console.error("Error fetching all courses:", error);
        }
      };
      fetchAllCourses();
    }
  };

  return (
    <div className="flex justify-center pb-7 px-7">
      <form className="w-1/2 pt-[50px] pb-5 ">
        <div className="relative">
          <input
            type="text"
            value={query} // Bind input to `query`
            onChange={handleInputChange}
            placeholder="What do you want to learn?"
            className="w-full px-5 py-2 font-1px placeholder-black text-black rounded-lg border-none ring-1 ring-[#072569] focus:ring-primary focus:ring-1"
          />
          <button
            className="text-white text-lg bg-[#072569] hover:bg-[#1146ce] px-3 py-0.25 rounded-lg absolute end-1.5 bottom-1.5"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
