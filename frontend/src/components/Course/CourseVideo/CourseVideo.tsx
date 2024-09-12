import React, { useCallback, useRef, useState, useEffect } from "react";
import { HOST } from "@/utils/constants";
import { toast } from "sonner";
import { uploadVideo } from "@/services/course.service";
import { Play, Pause, RefreshCw, Volume2, VolumeX } from "lucide-react";

interface CourseVideoProps {
  id: number;
  videoURL: string;
  title: string;
}

const CourseVideo: React.FC<CourseVideoProps> = ({ videoURL, title, id }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [uploadedVideoURL, setUploadedVideoURL] = useState<string | null>(null);

  const videoSource = uploadedVideoURL
    ? `${HOST}${uploadedVideoURL}`
    : `${HOST}${videoURL}`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [uploadedVideoURL, videoURL]);

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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="my-14 mx-auto max-w-4xl p-6 bg-gray-100 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="bg-white/20 hover:bg-white/30 transition-colors p-4 rounded-full"
            >
              <Play className="w-12 h-12 text-white" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <input
          type="range"
          value={currentTime}
          max={duration}
          step={0.1}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleReplay}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const newVolume = volume === 0 ? 1 : 0;
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                  }
                  setVolume(newVolume);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                {volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded cursor-pointer transition-colors"
        >
          Upload New Video
        </label>
      </div>
    </div>
  );
};

export default CourseVideo;