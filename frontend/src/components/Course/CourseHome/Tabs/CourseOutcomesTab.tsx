
import React, { useState, useCallback } from 'react';
import { Outcome } from '@/components/Course/types';
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import ConfirmDeleteModal from '@/components/Course/Modals/ConfirmDeleteModal';

interface CourseOutcomeComponentProps {
  outcomes: Outcome[];
  addOutcome: (outcomeName: string) => void;
  removeOutcome: (outcomeIndex: number) => void;
}

const CourseOutcomeComponent: React.FC<CourseOutcomeComponentProps> = ({
  outcomes,
  addOutcome,
  removeOutcome,
}) => {
  const [newOutcomeName, setNewOutcomeName] = useState<string>('');
  const [showNewOutcomeInput, setShowNewOutcomeInput] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOutcomeIndex, setSelectedOutcomeIndex] = useState<number | null>(null);

  const handleAddNewOutcome = useCallback(() => {
    if (newOutcomeName.trim() !== '') {
      addOutcome(newOutcomeName);
      setNewOutcomeName('');
      setShowNewOutcomeInput(false);
    }
  }, [newOutcomeName, addOutcome]);

  const handleOutcomeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNewOutcome();
    }
  };

  const handleDelete = () => {
    if (selectedOutcomeIndex !== null) {
      removeOutcome(selectedOutcomeIndex);
      setShowModal(false);
      setSelectedOutcomeIndex(null);
    }
  };

  return (
    <div className="mb-8 mx-2 pb-2">
      <h4 className="text-md font-medium text-primary pb-1 mb-2">Course Outcomes</h4>
      <div>
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{outcome.name}</span>
            <button className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600" onClick={() => { setSelectedOutcomeIndex(index); setShowModal(true); }}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {showNewOutcomeInput ? (
        <div className="flex ml-4 mt-4">
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={newOutcomeName}
            onChange={(e) => setNewOutcomeName(e.target.value)}
            onKeyPress={handleOutcomeKeyPress}
            placeholder="Enter outcome name"
          />
          <button className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-800" onClick={handleAddNewOutcome}>
            <FaPlus />
          </button>
        </div>
      ) : (
        <button className="w-60 mt-4 ml-5 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400" onClick={() => setShowNewOutcomeInput(true)}>
          Add Outcome +
        </button>
      )}
      {showModal && (
        <ConfirmDeleteModal setShowModal={setShowModal} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default CourseOutcomeComponent;
