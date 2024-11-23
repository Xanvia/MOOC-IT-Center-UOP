"use client";
import React, { useEffect, useState } from "react";
import {
  Share2,
  Download,
  Award,
  Trophy,
  Clock,
  Star,
  FileBadge,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getCertificate } from "@/services/course.service";

interface CertificateData {
  course_name: string;
  certificate_id: string;
  student_name: string;
  completion_date: string;
  score: number;
  hours_spent: number;
}

const CourseCompletion = () => {
  const params = useParams();
  const courseId = params.id;
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const data = await getCertificate(courseId as string);
        console.log("Certificate Data:", data);
        setCertificateData(data);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };
    fetchCertificate();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Trophy className="w-20 h-20 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            You&apos;ve successfully completed {certificateData?.course_name} course.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Score Card */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">{98}%</div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">{24}h</div>
              <div className="text-sm text-gray-500">Hours Spent</div>
            </div>
          </div>

          {/* Certificate ID Card */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6">
            <div className="text-center">
              <FileBadge className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {certificateData?.certificate_id}
              </div>
              <div className="text-sm text-gray-500">Certificate ID</div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="aspect-video bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <div className="text-center p-8">
                <Award className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Course Certificate
                </h3>
                <p className="text-gray-500">
                  Completed on {certificateData?.completion_date}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => window.open("/view-certificate", "_blank")}
          >
            <Award className="w-4 h-4" />
            View Certificate
          </button>

          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => console.log("Downloading certificate...")}
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>

          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => console.log("Sharing certificate...")}
          >
            <Share2 className="w-4 h-4" />
            Share Achievement
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCompletion;
