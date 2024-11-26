import React, { useState } from 'react';
import { CategoryEnum, categoryLabels } from '@/components/Course/course.types';

interface CategoryTabsProps {
  onCategoryChange: (category: CategoryEnum) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryEnum>(CategoryEnum.All);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategoryClick = (category: CategoryEnum) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };
  const toggleShowAll = () => {
    setShowAllCategories((prev) => !prev);
  };
  const categoryEntries = Object.entries(categoryLabels);
  const displayedCategories = showAllCategories
    ? categoryEntries
    : categoryEntries.slice(0, 5);


  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {Object.entries(categoryLabels).map(([categoryId, label]) => (
          <button
            key={categoryId}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === Number(categoryId)
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryClick(Number(categoryId) as CategoryEnum)}
          >
            {label}
          </button>
        ))}
        {categoryEntries.length > 5 && (
        <div className="text-center">
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={toggleShowAll}
          >
            {showAllCategories ? 'Show Less' : 'Show All'}
          </button>
        </div>
         )}
      </div>
      <hr className="border-t border-gray-300 mt-4" />
    </div>
  );
};

export default CategoryTabs;