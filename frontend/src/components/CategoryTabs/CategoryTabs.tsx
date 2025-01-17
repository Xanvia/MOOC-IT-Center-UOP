"use client";
import React, { useState, useEffect } from "react";
import { CategoryEnum } from "@/components/Course/course.types";
import { fetchAllCategories } from "@/services/course.service";
import {
  CircleArrowDown,
  CircleArrowUp,
  ArrowUp,
  ArrowDown,
  Ellipsis,
  PanelTopClose,
} from "lucide-react";
interface CategoryTabsProps {
  onCategoryChange: (category: CategoryEnum) => void;
}

interface Category {
  id: number;
  label: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryEnum>(
    CategoryEnum.All
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const interests = await fetchAllCategories();
        setCategories(interests);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: CategoryEnum) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const toggleShowAll = () => {
    setShowAllCategories((prev) => !prev);
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-4 my-6 mx-44">
        {displayedCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-blue-800 text-white hover:bg-blue-900"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category.id as CategoryEnum)}
          >
            {category.label}
          </button>
        ))}
        {categories.length > 5 && (
          <button
            className="ml-4 px-2 py-1 text-blue-600 hover:underline text-sm flex items-center"
            onClick={toggleShowAll}
          >
            {showAllCategories ? (
              <>
                <span className="mr-1"></span>
                <PanelTopClose size={24} />
              </>
            ) : (
              <>
                <span className="mr-1"></span>
                <Ellipsis size={24} />
              </>
            )}
          </button>
        )}
      </div>
      <hr className="border-t border-gray-300 mt-4" />
    </div>
  );
};

export default CategoryTabs;
