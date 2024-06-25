import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface SelectedTopicContextType {
  selectedTopic: any; // Consider using a more specific type based on your data structure
  setSelectedTopic: React.Dispatch<React.SetStateAction<any>>; // Adjust the type as necessary
}

// Create the context with an initial undefined value but with explicit typing
const SelectedTopicContext = createContext<SelectedTopicContextType | null>(null);

interface SelectedTopicProviderProps {
  children: ReactNode;
}

export const SelectedTopicProvider: React.FC<SelectedTopicProviderProps> = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState<any>(null); // Adjust the type as necessary

  return (
    <SelectedTopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </SelectedTopicContext.Provider>
  );
};

export const useSelectedTopic = () => useContext(SelectedTopicContext);