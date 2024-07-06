"use client";
import React, { useRef } from 'react';

const CourseVideo: React.FC = ({}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

  return (
  
    <div className="my-14 mx-12 p-3 border border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Web Programming</h2>
        <h3 className="text-xl font-medium mb-4">Learn how to create and develop websites using HTML, CSS, and JavaScript.</h3>
        <div className="relative my-4">
            <video className="max-w-full w-full h-96 object-cover" poster="/images/course1.png">
                <source 
                    src="https://www.youtube.com/embed/tN6oJu2DqCM?si=-C7zktITm4PYG5Vd" 
                    type="video/mp4" />
            </video>


            <div className="absolute inset-0 flex justify-center items-center">
                <button onClick={handlePlayPause} className=" shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">
                    <svg className="fill-yellow-400 w-20 h-20"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 384 512">
                            
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                    </svg>
                </button>
            </div>

            
        </div>
        <div className="flex justify-between">
            <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">Prev</button>
            <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">Mark as completed</button>
        </div>       
    </div>
);
};

export default CourseVideo;
