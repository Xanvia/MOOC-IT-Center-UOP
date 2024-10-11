import React, { useState } from 'react';

interface ToggleButtonProps {
  onToggle: (status: boolean) => void;
  initialStatus?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle, initialStatus = false }) => {
  const [isPublished, setIsPublished] = useState<boolean>(initialStatus);

  const handleToggle = (status: boolean) => {
    setIsPublished(status);
    onToggle(status);
  };

  return (
    <div className="inline-flex rounded-md shadow-sm bg-gray-200 p-1 mb-6" role="group">
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          !isPublished
            ? 'bg-blue-900 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => handleToggle(false)}
      >
        Unpublish
      </button>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isPublished
            ? 'bg-blue-900 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => handleToggle(true)}
      >
        Publish
      </button>
    </div>
  );
};

export default ToggleButton;