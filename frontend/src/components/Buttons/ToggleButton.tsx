import React, { useState } from 'react';

const PublishToggle = () => {
  const [isPublished, setIsPublished] = useState(true);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative bg-gray-200 rounded-full p-1 w-64">
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ease-in-out ${
            isPublished ? 'left-1 bg-blue-800' : 'left-1/2 bg-blue-800'
          }`}
        ></div>
        <div className="relative flex">
          <button
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              !isPublished ? 'text-white' : 'text-white'
            }`}
            onClick={() => setIsPublished(false)}
          >
            Unpublish
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              isPublished ? 'text-white' : 'text-white'
            }`}
            onClick={() => setIsPublished(true)}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishToggle;