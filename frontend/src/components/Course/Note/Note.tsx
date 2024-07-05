"use client";
import React from "react";
import NoteEditor from "./NoteEditor";
import classes from "./Note.module.css";

const webimage = "/images/webimagee.jpg";

const content = `
    <h2 >What is Web Developing</h2>
    <p>Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development:</p>
    <p>Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web developmntroduction to web development</p>
    <div>
      <img src="/images/webimagee.jpg" alt="Description of web development"  />
      <h2 >Key Subtopics</h2>
      <ul>
        <li>HTML (HyperText Markup Language)</li>
        <li>CSS (Cascading Style Sheets)</li>
        <li>JavaScript</li>
        <li>Web Development Tools and Environments</li>
        <li>Front-end Frameworks and Libraries</li>
        <li>Back-end Development</li>
        <li>Full-stack Development</li>
        <li>Web Hosting and Deployment</li>
        <li>Web Development Best Practices</li>
      </ul>
    </div>
    <p >Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web development is the process of creating websites and web apply.</p>
  `;

const Note: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl text-primary font-semibold ml-16 my-10">
        Introduction to Web Developing
      </h2>
      <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
        <div
          className={`${classes.note} ql-editor`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="space-y-2">
          <div className="pt-2">
            <NoteEditor onClick={() => {}} initialValue={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
