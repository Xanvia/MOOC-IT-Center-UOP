import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CreateCourseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-10 pl-24 pr-24 rounded-lg shadow-lg relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default CreateCourseModal;
