import React from 'react';

interface ToggleButtonProps {
  onToggle: (status: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isPublished, setIsPublished] = React.useState(false);

  const handleToggle = (status: boolean) => {
    setIsPublished(status);
    onToggle(status);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded ${!isPublished ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        onClick={() => handleToggle(false)}
      >
        Unpublish
      </button>
      <button
        className={`px-4 py-2 rounded ${isPublished ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        onClick={() => handleToggle(true)}
      >
        Publish
      </button>
    </div>
  );
};

export default ToggleButton;
