"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { HOST } from "@/utils/constants";
import { toast } from "sonner";
import { addQuizToVideo, uploadVideo } from "@/services/course.service";
import {
  Play,
  Pause,
  RefreshCw,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  PauseIcon,
} from "lucide-react";
import { useGlobal } from "@/contexts/store";
import { Permissions } from "../types";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import DeleteButtonPrimary from "@/components/Buttons/DeleteButtonPrimary";
import ChatDrawer from "../Drawer/Drawer";

interface MCQ {
  timestamp: number;
  question: string;
  options: string[];
  correctAnswer: number;
  isDone: boolean;
}

interface CourseVideoProps {
  id: number;
  videoURL: string;
  title: string;
  mcqs: any[];
  permissions: Permissions;
  isCompleted: boolean;
  setIsFinished: (isFinished: boolean) => void;
}

const CourseVideo: React.FC<CourseVideoProps> = ({
  videoURL,
  title,
  id,
  mcqs,
  permissions,
  isCompleted,
  setIsFinished,
}) => {
  const { userRole } = useGlobal();

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

  // Teacher mode variables
  const [editMCQs, setEditMCQs] = useState<MCQ[]>(mcqs); // editable list of MCQs
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newOptions, setNewOptions] = useState<string[]>([""]);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [editingMCQ, setEditingMCQ] = useState<MCQ | null>(null); // MCQ being edited
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(permissions.canEdit);
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const togglePreview = () => setIsPreview(!isPreview);

  const videoSource = uploadedVideoURL
    ? `${HOST}${uploadedVideoURL}`
    : `${HOST}${videoURL}`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [uploadedVideoURL, videoURL]);

  useEffect(() => {
    if (isPreview) {
      const checkForMCQ = () => {
        const matchingMCQ = mcqs.find(
          (mcq) =>
            Math.abs(mcq.timestamp - currentTime) < 0.5 &&
            !isCompleted &&
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
    }
  }, [currentTime, mcqs, currentMCQ, answeredMCQs, isPreview]);

  const handlePlayPause = () => {
    if (videoRef.current && !currentMCQ) {
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
      setAnsweredMCQs((prev) => new Set(prev).add(currentMCQ.timestamp));
      currentMCQ.isDone = true;

      // Check if all MCQs are completed
      const allMCQsCompleted = mcqs.every((mcq) => mcq.isDone);
      if (allMCQsCompleted) {
        setIsFinished(true);
      }
    }
    setCurrentMCQ(null);
    setSelectedAnswer(null);
    setShowResult(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Teacher Mode: Adding MCQ handling
  const addNewOption = () => setNewOptions([...newOptions, ""]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleNewOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const saveMCQ = async () => {
    const newMCQ: MCQ = {
      timestamp: currentTime,
      question: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      isDone: false,
    };

    const updatedMCQs = [...editMCQs, newMCQ]; // Append new MCQ to the list

    setEditMCQs(updatedMCQs); // Update the local state

    try {
      await addQuizToVideo(id, updatedMCQs); // Send updated MCQs array to backend
      toast.success("MCQ added successfully!");
      // Reset input fields after success
      setNewQuestion("");
      setNewOptions([""]);
      setNewCorrectAnswer(0);
    } catch (error: any) {
      toast.error("Error saving MCQ: " + error.message);
    }
  };

  const handleEditMCQ = (mcq: MCQ) => {
    setEditingMCQ(mcq);
    setNewQuestion(mcq.question);
    setNewOptions(mcq.options);
    setNewCorrectAnswer(mcq.correctAnswer);
  };

  const handleDeleteMCQ = async (timestamp: number) => {
    setIsLoading(true); // Start loading state

    const updatedMCQs = editMCQs.filter((mcq) => mcq.timestamp !== timestamp);
    setEditMCQs(updatedMCQs);

    try {
      await addQuizToVideo(id, updatedMCQs);
      toast.success("MCQ deleted successfully!");
    } catch (error: any) {
      toast.error("Error deleting MCQ: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMCQ = async () => {
    if (editingMCQ) {
      const updatedMCQs = editMCQs.map((mcq) =>
        mcq.timestamp === editingMCQ.timestamp
          ? {
              ...mcq,
              timestamp: currentTime,
              question: newQuestion,
              options: newOptions,
              correctAnswer: newCorrectAnswer,
            }
          : mcq
      );

      setEditMCQs(updatedMCQs); // Update local state with the new MCQ data

      try {
        await addQuizToVideo(id, updatedMCQs); // Send the updated MCQs to the backend
        toast.success("MCQ updated successfully!");
        // Clear the edit state after success
        setEditingMCQ(null);
        setNewQuestion("");
        setNewOptions([""]);
        setNewCorrectAnswer(0);
      } catch (error: any) {
        toast.error("Error updating MCQ: " + error.message);
      }
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto my-8"
      onMouseEnter={handleMouseEnter} // Start showing controls when hovering
      onMouseLeave={handleMouseLeave} // Hide controls when not hovering
    >
      <div
        className="bg-black rounded-lg overflow-hidden relative"
        style={{ zIndex: 1 }}
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
            style={{ zIndex: 2 }}
          >
            <Play className="w-20 h-20 text-white opacity-80" />
          </button>
        )}

        {isPlaying && !currentMCQ && isHovering && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ zIndex: 2 }}
          >
            <PauseIcon className="w-20 h-20 text-white opacity-80" />
          </button>
        )}

        {/* Controls container */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
            isHovering || !isPlaying ? "opacity-100" : "opacity-0"
          }`} // Show controls on hover or when video is paused
          style={{ zIndex: 2 }}
        >
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 appearance-none rounded-full outline-none opacity-70 transition-opacity cursor-pointer"
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

      <center>
        <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>
        {isEdit &&
          (isPreview ? (
            <EditButtonPrimary text="Edit" onClick={togglePreview} />
          ) : (
            <SecondaryButton text="Preview" onClick={togglePreview} />
          ))}

        {!isPreview && permissions.canUploadFiles && (
          <div className="mt-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <SecondaryButton
                text="Upload New Video" // Change the text here to whatever you want
                onClick={() => document.getElementById("file-upload")?.click()} // This will trigger the file input click
              />
            </label>
          </div>
        )}
      </center>

      {/* Teacher Mode: Add/Edit MCQs */}
      {!isPreview && (
        <div className="mt-12 p-10 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-red-400">Select timestamp using video slider</p>
          <h3 className="text-lg font-semibold mb-4">Add/Edit MCQs</h3>
          <div className="mb-4">
            {/* <label className="block font-medium mb-1">Question:</label> */}
            <input
              type="text"
              placeholder="Enter question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            {/* <label className="block font-medium mb-1">Options:</label> */}
            {newOptions.map((option, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter answer option"
                  value={option}
                  onChange={(e) => handleNewOptionChange(index, e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                {/* <input
                  type="text"
                  value={option}
                  onChange={(e) => handleNewOptionChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                /> */}
                {index === newOptions.length - 1 && (
                  <button
                    onClick={addNewOption}
                    className="bg-blue-900 text-white px-4 py-2 rounded"
                  >
                    Add Option
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Correct Answer:</label>
            <input
              type="number"
              value={newCorrectAnswer}
              onChange={(e) => setNewCorrectAnswer(parseInt(e.target.value))}
              className="w-20 p-2 border border-gray-300 rounded"
              min={0}
              max={newOptions.length - 1}
            />
          </div>
          {editingMCQ ? (
            <SecondaryButton
              text="Update MCQ" // Text for the button
              onClick={handleUpdateMCQ} // Click handler for updating MCQ
            />
          ) : (
            <SecondaryButton
              text="Save MCQ" // Text for the button
              onClick={saveMCQ} // Click handler for saving MCQ
            />
          )}
        </div>
      )}

      {/* MCQ List for Teacher */}
      {!isPreview && (
        <div className="p-10 bg-gray-100 rounded-lg shadow-lg mt-12 mb-24 z-40">
          <h3 className="text-lg font-semibold mb-4">MCQs List</h3>
          <ul className="space-y-4">
            {editMCQs.map((mcq) => (
              <li
                key={mcq.timestamp}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div>
                  <p className="font-medium">{mcq.question}</p>
                  <p className="text-sm text-gray-500">
                    Timestamp: {formatTime(mcq.timestamp)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <EditButtonPrimary
                    text="E D I T"
                    onClick={() => handleEditMCQ(mcq)}
                  />
                  <DeleteButtonPrimary
                    text="D E L E T E"
                    onClick={() => handleDeleteMCQ(mcq.timestamp)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MCQ View for students */}
      {currentMCQ && isPreview && (
        <div
          className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
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

      <button
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-lg shadow-lg focus:outline-none"
        onClick={toggleDrawer}
      >
        {isDrawerOpen ? ">" : "<"} {/* Toggle Arrow Icon */}
      </button>

      {/* Chat Drawer Component */}
      <ChatDrawer
        id={id}
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default CourseVideo;
