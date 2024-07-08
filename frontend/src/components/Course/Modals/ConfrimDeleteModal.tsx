import DeleteButton from "@/components/Buttons/DeleteButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import SolidButton from "@/components/Buttons/SolidButton";
import { ModalClassesBG } from "@/components/components.styles";
import React from "react";

interface ConfirmDeleteModalProps {
  handleDelete: () => void;
  setShowModal: (show: boolean) => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  handleDelete,
  setShowModal,
}) => {
  return (
    <div className={ModalClassesBG}>
      <div className="bg-white p-8 rounded shadow-lg w-[600px] h-[150px]">
        <p className="text-primary text-lg">
          Are you sure you want to delete this week?
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
    </div>
  );
};

export default ConfirmDeleteModal;
