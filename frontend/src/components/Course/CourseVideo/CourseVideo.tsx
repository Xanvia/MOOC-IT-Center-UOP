"use client";
import React, { useRef, useState } from "react";
import { HOST } from "@/utils/constants";

interface CourseVideoProps {
  videoURL: string;
  title: string;
}

const CourseVideo: React.FC<CourseVideoProps> = ({ videoURL, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isEnded, setIsEnded] = useState(false);

  const VideoSource = `${HOST}${videoURL}`;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setIsEnded(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = Number(event.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  return (
    <div className="my-14 mx-12 p-3 border border-gray-200 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {/* <h3 className="text-xl font-medium mb-4">Instalasi Tools</h3> */}
      <div className="relative my-4 group">
        <video
          ref={videoRef}
          className="w-full h-auto max-h-96 object-cover"
          onEnded={handleVideoEnd}
          controls={false}
        >
          <source src={VideoSource} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex justify-center items-center">
          {isPlaying && !isEnded && (
            <button
              onClick={handlePlayPause}
              className="hidden group-hover:block shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
            >
              <svg
                className="w-16 h-16 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 011.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {(!isPlaying || isEnded) && (
            <button
              onClick={handlePlayPause}
              className="shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
            >
              <svg
                className="w-16 h-16 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L13 9.586a1 1 0 010 1.414L7.707 16.707a1 1 0 01-1.414-1.414L10.586 11 6.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {isEnded && (
            <button
              onClick={handleReplay}
              className="shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
            >
              <svg
                className="w-16 h-16 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L13 9.586a1 1 0 010 1.414L7.707 16.707a1 1 0 01-1.414-1.414L10.586 11 6.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="mr-2"
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
