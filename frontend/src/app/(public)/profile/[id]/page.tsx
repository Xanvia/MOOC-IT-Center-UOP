"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { Work, Education, ProfileData } from "@/components/Profile/types";
import { fetchProfileDataById } from "@/services/user.service";

// Lazy-loaded components
const Profile = React.lazy(() => import("@/components/Profile/Profile"));
const EducationModal = React.lazy(
  () => import("@/components/Profile/Education/EducationModal")
);
const EducationCard = React.lazy(
  () => import("@/components/Profile/Education/EducatonCard")
);
const ExperienceCard = React.lazy(
  () => import("@/components/Profile/Experience/WorkExperienceCard")
);
const ExperienceModal = React.lazy(
  () => import("@/components/Profile/Experience/WorkExperienceModal")
);

export default function ProfilePage() {
  const { id } = useParams(); // Extract 'id' from URL params
  const [work, setWork] = useState<Work[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const loadProfileData = async () => {
      if (!id) {
        setError("User ID not found in URL");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching profile data for ID:", id);
        const data = await fetchProfileDataById(id as string);
        console.log("Fetched profile data:", data);
        setWork(data.work_experiences || []);
        setEducation(data.educations || []);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [id, reload]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <p className="text-xl font-semibold">No profile data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        {/* Profile Section */}
        <Suspense fallback={<p>Loading Profile...</p>}>
          <Profile reloadData={reloadData} profileData={profileData} />
        </Suspense>

        {/* Education & Work Experience Section */}
        <div className="relative lg:w-full h-11/12 md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="min-h-[300px]">
            {/* Education Section */}
            <Suspense fallback={<p>Loading Education Modal...</p>}>
              <EducationModal
                CardTitle="Add Your Education Details"
                reloadData={reloadData}
              />
            </Suspense>
            <Suspense fallback={<p>Loading Education Details...</p>}>
              {education && education.length > 0 ? (
                education.map((eduItem) => (
                  <EducationCard
                    key={eduItem.id}
                    eduData={eduItem}
                    reload={reloadData}
                  />
                ))
              ) : (
                <div className="py-10 text-xl text-center">
                  <p>No education details available</p>
                </div>
              )}
            </Suspense>
          </div>

          {/* Work Experience Section */}
          <div className="py-3">
            <Suspense fallback={<p>Loading Work Experience Modal...</p>}>
              <ExperienceModal
                CardTitle="Add Your Work Experience"
                reloadData={reloadData}
              />
            </Suspense>
            <Suspense fallback={<p>Loading Work Experience...</p>}>
              {work && work.length > 0 ? (
                work.map((workItem) => (
                  <ExperienceCard
                    key={workItem.id}
                    workData={workItem}
                    reload={reloadData}
                  />
                ))
              ) : (
                <div className="py-10 text-xl text-center">
                  <p>Add your work experience here</p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
