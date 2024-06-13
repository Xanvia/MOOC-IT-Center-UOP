"use client";
import React from 'react';
import { useState } from "react";
interface AccordionItem {
  title: string;
  content: string;
}
const accordionData: AccordionItem[] = [
    {
      title: "Introduction to jQuery",
      content:
        "Beginner-friendly course that teaches the basics of using jQuery, a popular JavaScript library. Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
    },
    {
      title: "Introduction to AJAX",
      content:
        "Learn how to make asynchronous requests using AJAX.Beginner-friendly course that teaches the basics of using jQuery, a popular JavaScript library. the basics of using jQuery, a popular JavaScript library.",
    },
    {
      title: "Single Page Applications (SPAs)",
      content:
        "Understand the principles behind SPAs and how they work. Learn how to make asynchronous requests using AJAX.Beginner-friendly co Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
    },
    {
      title: "Angular as a SPA Framework",
      content:
        "Learn how to use Angular for building SPAs. Learn how to make asynchronous requests using AJAX.Beginner-friendly co Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
    },
  ];

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
      };
    return (
        <div className="w-64 p-4 border-r border-gray-200">
        <div className="mb-6">
            <h3 className="text-lg font-semibold">Stats</h3>
            <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded" style={{ width: '40%' }}></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">4 of the 20 videos have been completed</p>
        </div>
        <div className="mb-6">
            <h4 className="text-md font-medium">Intro</h4>
            <p className="mt-3 text-blue-600 cursor-pointer hover:underline">Instructor introduction</p>
        </div>
        <div className="mb-6">
            <h4 className="text-md font-medium">Installation</h4>
            <p className="mt-3 text-blue-600 cursor-pointer hover:underline">Download Tools</p>
            <p className="mt-2 font-semibold text-blue-600 cursor-pointer">Tools Installation</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Basic Usage Tools</p>
        </div>
        <div className="mb-6">
            <h4 className="text-md font-medium">Basic HTML</h4>
            <p className="mt-3 text-blue-600 cursor-pointer hover:underline">About HTML</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Running Code</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Tag</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Header and Paragraph</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">List</p>
            <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Table</p>
        </div>
        <div className='mb=6'>
        <div className="xl:mr-56 pt-10 xl-pt-0">
                <div className="">
                <div className=" ">
                    {accordionData.map((item, index) => (
                    <div key={index}>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            marginBottom: "32px",
                            borderBottom: "1px solid black",
                            paddingBottom: "8px",
                        }}
                        onClick={() => handleToggle(index)}
                        >
                        <span
                            style={{
                            color: activeIndex === index ? "blue" : "black",
                            }}
                        >
                            {index + 1 < 10 ? `0${index + 1}.` : index + 1}{" "}
                            {item.title}.
                        </span>

                        <span>{activeIndex === index ? "x" : "+"}</span>
                        </div>
                        {activeIndex === index && (
                        <div
                            style={{ paddingLeft: "32px", marginBottom: "44px" }}
                        >
                            {item.content}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
        </div>
    );
    };

export default Sidebar;
