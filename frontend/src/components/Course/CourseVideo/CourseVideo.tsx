import React from "react";

const CourseVideo: React.FC = ({}) => {
  return (
  
    <div className="my-14 mx-12 p-3 border border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Web Praogramming</h2>
        <h3 className="text-xl font-medium mb-4">Learn how to create and develop websites using HTML, CSS, and JavaScript.</h3>
        <div className="relative my-4">
            <div className="absolute inset-0 flex justify-center items-center">
                <button className="bg-yellow-500 p-4 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* <video controls className="max-w-full w-full h-96 object-cover" poster="/images/course1.png">
                <source src="https://www.youtube.com/embed/tN6oJu2DqCM?si=-C7zktITm4PYG5Vd" type="video/mp4" />
            </video> */}
            <video className=" relative mb-4 w-full h-auto rounded-lg" controls>
                <source src="https://www.youtube.com/embed/tN6oJu2DqCM?si=-C7zktITm4PYG5Vd" type="video/mp4" />
                <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
                Your browser does not support the video tag.
            </video>
            
        </div>
        <div className="flex justify-between">
            <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg">Prev</button>
            <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg">Mark as completed</button>
        </div>       
    </div>
);
};

export default CourseVideo;
