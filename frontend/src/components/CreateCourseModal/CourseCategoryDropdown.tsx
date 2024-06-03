import React from 'react';

interface CourseCategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CourseCategoryDropdown: React.FC<CourseCategoryDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="">Select a category</option>
        <option value="statistics">Statistics</option>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
      </select>
    </div>
  );
};

export default CourseCategoryDropdown;
