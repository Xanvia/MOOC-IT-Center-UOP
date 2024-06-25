import { Topic } from "@/components/Course/types";

export const initialTopics: Topic[] = [
  {
    category: "Week 1",
    subtopics: [
      {
        title: "Introduction",
        items: [
          {
            title: "Instructor introduction",
            content: "Content for Instructor introduction",
            type: "note",
          },
        ],
      },
    ],
  },
  {
    category: "Week 2",
    subtopics: [
      {
        title: "Tools",
        items: [
          {
            title: "Download Tools",
            content: "",
            type: "video",
          },
          {
            title: "Tools Installation",
            content: "",
            type: "note",
          },
          {
            title: "Basic Usage Tools",
            content: "",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    category: "Week 3",
    subtopics: [
      {
        title: "HTML Basics",
        items: [
          {
            title: "About HTML",
            content: "Content for About HTML",
            type: "note",
          },
          {
            title: "Running Code",
            content: "Content for Running Code",
            type: "video",
          },
          { title: "Tag", content: "Content for Tag", type: "quiz" },
          {
            title: "Header and Paragraph",
            content: "Content for Header and Paragraph",
            type: "video",
          },
          { title: "List", content: "Content for List", type: "note" },
          { title: "Table", content: "Content for Table", type: "quiz" },
        ],
      },
      {
        title: "Tools",
        items: [
          {
            title: "Download Tools",
            content: " <>Content for Download Tools</>",
            type: "video",
          },
          {
            title: "Tools Installation",
            content: " <p>Content for tools installation</p>",
            type: "note",
          },
          {
            title: "Basic Usage Tools",
            content: "",
            type: "quiz",
          },
        ],
      },
    ],
  },
];
