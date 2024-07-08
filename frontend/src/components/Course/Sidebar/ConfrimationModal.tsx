import React, { useState } from "react";
import CloseButton from "../../Buttons/CloseButton";
import SolidButton from "@/components/Buttons/SolidButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

export default function CreateCourseModal() {
   
    const [isOpen, setIsOpen] = useState(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };
    
    const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(false);
      };

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };  



    return (
        <>
        <SecondaryButton onClick={toggleModal} text="Add Item +" />
        {isOpen && (
        <div className="fixed flex items-center justify-center h-full w-full z-10" onMouseDown={handleInsideClick}>
          <div
            className="bg-white py-10 px-5 sm:px-10 rounded-lg shadow-lg relative max-w-3xl w-full"
            onMouseDown={handleOutsideClick}
          >
            <CloseButton onClick={toggleModal} />
            <h1 className="text-primary font-bold text-center text-2xl mb-8">
              Are You Sure?
            </h1>
          </div>
        </div>
      )}
        </>
    );
}
    