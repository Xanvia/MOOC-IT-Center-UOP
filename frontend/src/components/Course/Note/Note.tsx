"use client";
import React from "react";
import NoteEditor from "./NoteEditor";

const webimage = "/images/webimagee.jpg";

const Note: React.FC = () => {
  return (
    <div>
      
      <h2 className = "text-2xl text-primary font-semibold ml-16 my-10">Introduction to Web Developing</h2>
      <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
      <h2 className = "text-xl text-primary font-semibold ml-16 mb-10">What is Web Developing</h2>
        <p className ="mx-10">Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development:</p>
        <p className ="mx-10 m-4">Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web developmntroduction to web development</p>
        <div className="m-10 ml-16">
        <img src={webimage} alt="Description of web development" className="w-full h-auto rounded-lg shadow-md mb-6" />
          <h2 className="text-lg text-primary font-semibold mb-4">Key Subtopics</h2>
          <ul className="mx-6 list-disc list-inside space-y-2">
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
        <p className ="mx-10 mb-10">Web development is the process of creating websites and web applications. It involves various technologies and practices that allow developers to build and maintain web content that can be accessed through browsers. Here are some key subtopics to understand in an introduction to web development: Web development is the process of creating websites and web apply.</p>
        <div className="space-y-2">
          <div className="pt-2">
            <NoteEditor onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
