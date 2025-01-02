"use client";
import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaTrash } from "react-icons/fa";
import SolidButton from "@/components/Buttons/SolidButton";
import { toast } from "sonner";
import { addSyllabus } from "@/services/course.service";

interface AccordionItem {
  title: string;
  content: string;
}

interface CourseContentProps {
  courseId: number;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [sections, setSections] = useState<AccordionItem[]>([
    { title: "", content: "" }
  ]);

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
    try {
      // Extract only the titles and contents from sections
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
          <div>
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
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      placeholder="Enter section title"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(index);
                      }}
                      className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
                    >
                      <FaTrash />
                    </button>
                    <span>
                      {activeIndex === index ? (
                        <FaChevronUp className="text-lg" />
                      ) : (
                        <FaChevronDown className="text-lg" />
                      )}
                    </span>
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="mt-4 pl-[40px]">
                    <textarea
                      value={section.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      placeholder="Enter section content"
                      className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={addSection}
              className="w-full  p-2  bg-slate-500 text-white rounded hover:bg-slate-600"
            >
              Add New Section
            </button>
            
            <div className="flex justify-end mt-16">
              <SolidButton
                type="button"
                text="S A V E"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
