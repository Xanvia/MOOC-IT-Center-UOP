import React, { useState } from 'react';
import { CategoryEnum, categoryLabels } from '@/components/Course/course.types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DepartmentData {
  id: number;
  name: string;
}

interface FacultyData {
  id: CategoryEnum;
  name: string;
  departments: DepartmentData[];
}

// Sample extended data with more faculties and departments
const facultyDepartments: FacultyData[] = [
  {
    id: CategoryEnum.Science,
    name: 'Faculty of Science',
    departments: [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Physics' },
      { id: 3, name: 'Chemistry' },
    ],
  },
  {
    id: CategoryEnum.Engineering,
    name: 'Faculty of Engineering',
    departments: [
      { id: 4, name: 'Electrical Engineering' },
      { id: 5, name: 'Mechanical Engineering' },
      { id: 6, name: 'Civil Engineering' },
    ],
  },
  {
    id: CategoryEnum.Business,
    name: 'Faculty of Business',
    departments: [
      { id: 7, name: 'Finance' },
      { id: 8, name: 'Marketing' },
      { id: 9, name: 'Management' },
    ],
  },
  {
    id: CategoryEnum.Health,
    name: 'Faculty of Health Sciences',
    departments: [
      { id: 10, name: 'Nursing' },
      { id: 11, name: 'Pharmacy' },
      { id: 12, name: 'Public Health' },
    ],
  },
];

interface CategoryTabsProps {
  onCategoryChange: (category: CategoryEnum) => void;
  onDepartmentSelect?: (facultyId: CategoryEnum, departmentId: number) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange, onDepartmentSelect }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryEnum>(CategoryEnum.All);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);

  const handleCategoryClick = (category: CategoryEnum) => {
    setIsDropdownOpen(category === CategoryEnum.All ? !isDropdownOpen : false);
    setSelectedFaculty(null);
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleDepartmentClick = (facultyId: CategoryEnum, departmentId: number) => {
    onDepartmentSelect && onDepartmentSelect(facultyId, departmentId);
    setIsDropdownOpen(false);
    setSelectedFaculty(null);
  };

  return (
    <div className="relative mb-6">
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {Object.entries(categoryLabels).map(([categoryId, label]) => (
          <button
            key={categoryId}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === Number(categoryId)
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryClick(Number(categoryId) as CategoryEnum)}
          >
            {label}
            {label === 'All Courses' && <ChevronDown className="ml-1 w-4 h-4" />}
          </button>
        ))}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 w-[900px] bg-white rounded-lg shadow-lg border transition duration-300">
          <div className="flex min-h-[400px] divide-x divide-gray-300">
            {/* Faculty Column */}
            <div className="w-1/2 p-4">
              <h3 className="font-semibold text-lg mb-4">Faculty</h3>
              <div className="space-y-2">
                {facultyDepartments.map((faculty) => (
                  <button
                    key={faculty.id}
                    className={`w-full px-4 py-2 text-left rounded-md flex items-center transition-colors ${
                      selectedFaculty?.id === faculty.id
                        ? 'bg-blue-50 text-blue-800'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    <span>{faculty.name}</span>
                    {selectedFaculty?.id === faculty.id && <ChevronRight className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Departments Column */}
            <div className="w-1/2 p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-4">
                {selectedFaculty ? `${selectedFaculty.name} Departments` : 'Departments'}
              </h3>
              <div className="space-y-2">
                {selectedFaculty?.departments.map((dept) => (
                  <button
                    key={dept.id}
                    className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100"
                    onClick={() => handleDepartmentClick(selectedFaculty.id, dept.id)}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="border-t border-gray-300 mt-4" />
    </div>
  );
};

export default CategoryTabs;
