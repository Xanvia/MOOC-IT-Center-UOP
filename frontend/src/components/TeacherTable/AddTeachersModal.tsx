import React, { useState, useEffect } from "react";
import CloseButton from "../Buttons/CloseButton";
import {
  addTeacherToCourse,
  getAvalibleTeachers,
  removeTeacher,
} from "@/services/settings.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Teacher {
  id: number;
  username: string;
  name: string;
  email: string;
  added: boolean;
}

export default function AddTeachersModal() {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [teachersData, setTeachersData] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const teachers = await getAvalibleTeachers(params.courseId as string);
        setTeachersData(teachers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen, params.courseId]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setConfirmationOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedTeacher) return;

    try {
      setIsLoading(true);
      // TODO: Implement API call to add or remove teacher
      // For example:
      if (selectedTeacher.added) {
        try {
          await removeTeacher(
            params.courseId as string,
            selectedTeacher.id.toString()
          );
          toast.success("Teacher removed successfully");
        } catch (error) {
          console.error("Error removing teacher:", error);
        }
      } else {
        try {
          await addTeacherToCourse(
            params.courseId as string,
            selectedTeacher.username
          );
          toast.success("Teacher added successfully");
        } catch (error) {
          console.error("Error adding teacher:", error);
        }
      }

      // Update the local state to reflect the change
      setTeachersData((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? { ...teacher, added: !teacher.added }
            : teacher
        )
      );
    } catch (error) {
      console.error("Error adding/removing teacher:", error);
    } finally {
      setConfirmationOpen(false);
      setSelectedTeacher(null);
      setIsLoading(false);
    }
  };

  const handleCancelAction = () => {
    setConfirmationOpen(false);
    setSelectedTeacher(null);
  };

  const filteredTeachers = teachersData.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
      >
        Add Teachers
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30"
          onClick={toggleModal}
        >
          <div
            className="bg-white py-10 px-5 sm:px-16 rounded-lg shadow-lg relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={toggleModal} />
            <h2 className="text-xl font-bold mb-6 text-center">
              Assign Teachers to the Course
            </h2>

            <input
              type="text"
              placeholder="Search names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left font-semibold p-2 sticky top-0 bg-gray-100">
                      Name
                    </th>
                    <th className="text-left font-semibold p-2 sticky top-0 bg-gray-100">
                      Email
                    </th>
                    <th className="text-right font-semibold p-2 sticky top-0 bg-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className={`border-b ${
                          teacher.added ? "border-blue-500 bg-blue-50" : ""
                        }`}
                      >
                        <td className="p-2">{teacher.name}</td>
                        <td className="p-2">{teacher.email}</td>
                        <td className="p-2 text-right space-x-2">
                          <button
                            onClick={() => handleSelectTeacher(teacher)}
                            className={`px-3 py-1 text-white rounded hover:opacity-80 mb-1 ${
                              teacher.added ? "bg-red-600" : "bg-blue-700"
                            }`}
                            disabled={isLoading}
                          >
                            {teacher.added ? "Remove Teacher" : "Add Teacher"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-gray-500 p-4">
                        {isLoading ? "Loading..." : "No results found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {confirmationOpen && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white py-6 px-10 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">
              {selectedTeacher.added
                ? "Are you sure you want to remove this teacher?"
                : "Are you sure you want to add this teacher?"}
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                Yes
              </button>
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                disabled={isLoading}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
