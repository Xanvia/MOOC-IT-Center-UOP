"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { Work, Education, ProfileData } from "@/components/Profile/types";
import { fetchProfileData } from "@/services/user.service";
import { fetchProfileDataById } from "@/services/user.service";

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
  const reloadData = () => {
    setReload((prevState) => !prevState);
  };
  const params = useParams();
  const { id } = params; // Ensure 'id' is fetched properly
  const [work, setWork] = useState<Work[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!id) {
        setError("User ID not found in URL");
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
      }
    };
  
    loadProfileData();
  }, [id, reload]);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading profile data...</div>;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Suspense>
        <Profile reloadData={() => setReload(!reload)} profileData={profileData} />
        </Suspense>
        <div className="relative lg:w-full h-11/12 md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="min-h-[300px]">
            <Suspense>
              <EducationModal
                CardTitle="Add Your Education Details"
                reloadData={reloadData}
              />
            </Suspense>
            <Suspense>
              {education && education.length > 0 ? (
                education.map((eduItem) => (
                  <EducationCard
                    key={eduItem.id}
                    eduData={eduItem}
                    reload={reloadData}
                  />
                ))
              ) : (
                <div className="py-10 text-xl">
                  <p>No education details available</p>
                </div>
              )}
            </Suspense>
          </div>
          <div className="py-3">
            <Suspense>
              <ExperienceModal
                CardTitle="Add Your Work Experience"
                reloadData={reloadData}
              />
            </Suspense>
            <Suspense>
              {work && work.length > 0 ? (
                work.map((workItem) => (
                  <ExperienceCard
                    key={workItem.id}
                    workData={workItem}
                    reload={reloadData}
                  />
                ))
              ) : (
                <div className="py-10 text-xl">
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
