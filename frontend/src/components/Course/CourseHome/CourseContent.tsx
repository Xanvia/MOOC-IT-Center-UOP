"use client";
import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaTrash, FaPlus } from "react-icons/fa";
import SolidButton from "@/components/Buttons/SolidButton";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { toast } from "sonner";
import { addSyllabus } from "@/services/course.service";

interface AccordionItem {
  title: string;
  content: string;
}

interface CourseContentProps {
  courseId: number;
  syllabus: string[];
  isEdit: boolean;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId, syllabus, isEdit }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [sections, setSections] = useState<AccordionItem[]>(
    syllabus.map((item) => {
      const [title, ...contentParts] = item.split(": ");
      return { title, content: contentParts.join(": ") };
    }) || [{ title: "", content: "" }]
  );

  const [editView, setEditView] = useState(false);

  const toggleEditView = () => setEditView(!editView);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleTitleChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].title = value;
    setSections(newSections);
  };

  const handleContentChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].content = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { title: "", content: "" }]);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const handleSave = async () => {
    toggleEditView();
    try {
      const syllabus = sections.map((section) => `${section.title}: ${section.content}`);
      const response = await addSyllabus(courseId, syllabus);
      toast.success(response.message || "Course content saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save course content.");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:mx-12 my-24 md:mx-28 mx-10 lg:mx-40">
        <div>
          <h1 className="text-3xl text-center font-bold text-primary">
            Course Content
          </h1>
        </div>
        <div className="xl:mr-56 pt-10 xl:pt-0">
          {isEdit && !editView && (
            <EditButtonPrimary text="E D I T" onClick={toggleEditView} />
          )}

          {sections.map((section, index) => (
            <div key={index} className="mb-8 border-b border-gray-300 pb-4">
              <div
                className="flex justify-between items-center text-primary cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <div className="flex-1 flex items-center gap-2">
                  <span className={`${
                    activeIndex === index ? "font-bold" : "font"
                  } min-w-[40px]`}>
                    {index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}
                  </span>
                  {editView ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      placeholder="Enter section title"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span>{section.title}</span>
                  )}
                </div>
                {editView && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeSection(index)}
                      className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
                <span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-lg" />
                  ) : (
                    <FaChevronDown className="text-lg" />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <div className="mt-4 pl-[40px]">
                  {editView ? (
                    <textarea
                      value={section.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      placeholder="Enter section content"
                      className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                    />
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {editView && (
            <>
              <button
                onClick={addSection}
                className="w-full p-2 bg-slate-500 text-white rounded hover:bg-slate-600"
              >
                <FaPlus className="inline mr-2" /> Add New Section
              </button>
              <div className="flex justify-end mt-8">
                <SolidButton type="button" text="S A V E" onClick={handleSave} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
