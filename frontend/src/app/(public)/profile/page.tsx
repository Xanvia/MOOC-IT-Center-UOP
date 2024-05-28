"use client";
import React from "react";
import Profile from "@/components/Profile/Profile";
import ExperienceModal from "@/components/Profile/Experience/ExperienceModal";
import ExperienceCard from "@/components/Profile/Experience/ExperienceCard";
import EducationCard from "@/components/Profile/Education/EducatonCard";
import EducationModal from "@/components/Profile/Education/EducationModal";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: string;
  location: string;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MDYxMzQxLCJpYXQiOjE3MTY4ODg1NDEsImp0aSI6ImMwMDEyZDAyN2Q2ZjRkNmJhNTk1OTQxYmMwNjM2MzZiIiwidXNlcl9pZCI6NX0.LKtWn8K1oSyEgl95_K2fZXmtIGpHE2xILEkb7TzzojM";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        const data: UserInfo = response.data;
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="">
            <ExperienceModal
              CardTitle="Add Your Work Experience"
              Action="Add"
            />
            <ExperienceCard />
            <ExperienceCard />
          </div>
          <div className="py-3">
            <EducationModal
              CardTitle="Add Your Education Details"
              Action="Add"
            />
            <EducationCard />
          </div>
        </div>
      </div>
    </>
  );
}
