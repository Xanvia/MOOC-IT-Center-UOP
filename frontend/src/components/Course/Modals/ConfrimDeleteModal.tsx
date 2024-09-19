import React from "react";
import ReactDOM from "react-dom";
import DeleteButton from "@/components/Buttons/DeleteButton";
import SolidButton from "@/components/Buttons/SolidButton";

interface ConfirmDeleteModalProps {
  handleDelete: () => void; // Define handleDelete as a function that returns void
  setShowModal: (show: boolean) => void; // Define setShowModal as a function that takes a boolean and returns void
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  handleDelete,
  setShowModal,
}) => {
  return ReactDOM.createPortal(
    <div
      style={{
        zIndex: 1000, // High z-index for the modal
        position: "fixed", // Fixed position for modal
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Backdrop effect
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-[600px] h-[150px]">
        <p className="text-primary text-lg">
          Are you sure you want to delete this?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <DeleteButton text="D E L E T E" onClick={handleDelete} />
          <SolidButton
            onClick={() => setShowModal(false)}
            text="Cancel"
            type="button"
          />
        </div>
      </div>
    </div>,
    document.body // Use React Portal to render in body
  );
};

export default ConfirmDeleteModal;
