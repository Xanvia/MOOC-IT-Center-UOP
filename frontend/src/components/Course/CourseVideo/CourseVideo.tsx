"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { HOST } from "@/utils/constants";
import { toast } from "sonner";
import { uploadVideo } from "@/services/course.service";
import {
  Play,
  Pause,
  RefreshCw,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
} from "lucide-react";

interface MCQ {
  timestamp: number;
  question: string;
  options: string[];
  correctAnswer: number;
  isDone: boolean; // Add isDone to track if MCQ is completed
}

interface CourseVideoProps {
  id: number;
  videoURL: string;
  title: string;
  mcqs: MCQ[];
}

const CourseVideo: React.FC<CourseVideoProps> = ({
  videoURL,
  title,
  id,
  mcqs,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [uploadedVideoURL, setUploadedVideoURL] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentMCQ, setCurrentMCQ] = useState<MCQ | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredMCQs, setAnsweredMCQs] = useState<Set<number>>(new Set());

  const videoSource = uploadedVideoURL
    ? `${HOST}${uploadedVideoURL}`
    : `${HOST}${videoURL}`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [uploadedVideoURL, videoURL]);

  useEffect(() => {
    const checkForMCQ = () => {
      const matchingMCQ = mcqs.find(
        (mcq) =>
          Math.abs(mcq.timestamp - currentTime) < 0.5 &&
          !mcq.isDone && // Only trigger if the MCQ is not done
          !answeredMCQs.has(mcq.timestamp)
      );
      if (matchingMCQ && !currentMCQ) {
        setCurrentMCQ(matchingMCQ);
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsPlaying(false);
      }
    };

    checkForMCQ();
  }, [currentTime, mcqs, currentMCQ, answeredMCQs]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const response = await uploadVideo(file, id);
          setUploadedVideoURL(response.data.url);
          toast.success(response.message);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    },
    [id]
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentMCQ) {
      // Mark the MCQ as done
      setAnsweredMCQs((prev) => new Set(prev).add(currentMCQ.timestamp));
      currentMCQ.isDone = true; // Mark the MCQ as done once answered
    }
    setCurrentMCQ(null);
    setSelectedAnswer(null);
    setShowResult(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div
        className="bg-black rounded-lg overflow-hidden relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-auto"
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        {!isPlaying && !currentMCQ && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <Play className="w-20 h-20 text-white opacity-80" />
          </button>
        )}
        {currentMCQ && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">{currentMCQ.question}</h3>
              <div className="space-y-2">
                {currentMCQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-2 rounded ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentMCQ.correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-4">
                  <p
                    className={`font-bold ${
                      selectedAnswer === currentMCQ.correctAnswer
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedAnswer === currentMCQ.correctAnswer
                      ? "Correct!"
                      : "Incorrect. The correct answer was: " +
                        currentMCQ.options[currentMCQ.correctAnswer]}
                  </p>
                  <button
                    onClick={handleContinue}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Continue Video
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
            isHovering || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 appearance-none rounded-full outline-none opacity-70 transition-opacity cursor-pointer"
            disabled={!!currentMCQ && !currentMCQ.isDone && selectedAnswer === null} // Disable only if MCQ isn't done
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleReplay}
                className="text-white hover:text-gray-300"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 group">
                <button
                  onClick={() => {
                    const newVolume = volume === 0 ? 1 : 0;
                    if (videoRef.current) {
                      videoRef.current.volume = newVolume;
                    }
                    setVolume(newVolume);
                  }}
                  className="text-white hover:text-gray-300"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white appearance-none rounded-full outline-none opacity-70 transition-opacity cursor-pointer hidden group-hover:block"
                />
              </div>
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-gray-300">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>
      <div className="mt-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded cursor-pointer transition-colors inline-block"
        >
          Upload New Video
        </label>
      </div>
    </div>
  );
};

export default CourseVideo;
