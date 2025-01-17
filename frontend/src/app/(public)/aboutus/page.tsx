"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

interface Stat {
  id: number;
  label: string;
  value: string;
}

interface AboutContent {
  mission: string;
  vision: string;
  stats: Stat[];
  teamMembers: TeamMember[];
}

const defaultStats: Stat[] = [
  { id: 1, label: "Active Students", value: "10,000+" },
  { id: 2, label: "Courses Available", value: "500+" },
  { id: 3, label: "Success Rate", value: "95%" },
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Upul Jayasinghe",
    role: "Director",
    bio: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
    imageUrl:
      "https://people.ce.pdn.ac.lk/images/staff/academic-staff/upul-jayasinghe.jpg",
  },
  {
    id: 2,
    name: "Dr. Hakim A. Usoof",
    role: "Deputy Director",
    bio: "B.Sc(Pera), PhD(Sweden)",
    imageUrl: "https://sci.pdn.ac.lk/scs/assets/img/staff/16-hakim.webp",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    role: "OPEN-ED Director",
    bio: "B.Sc., M.Sc (Computer Science)",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3",
  },
];

const SolidButton = () => {
  const handleClick = () => {
    window.location.href = "http://www.ceit.pdn.ac.lk/";
  };

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <button
          onClick={handleClick}
          className="bg-blue-950 hover:bg-blue-900 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
        >
          IT Center →
        </button>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "About Us - OpenEd";
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // const response = await axios.get("http://localhost:8000/api/about-content/");
        // setContent(response.data);
      } catch (error) {
        console.error("Error fetching about page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="bg-primary text-white py-32 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-8">
                OpenEd: Transforming Education
              </h1>
              <p className="text-xl max-w-2xl leading-relaxed">
                {content?.mission ||
                  "To provide accessible, inclusive, and high-quality educational resources through innovative technology, empowering learners worldwide to reach their full potential and cultivate a lifelong passion for knowledge."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(content?.stats || defaultStats).map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold text-primary mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Vision</h2>
          <p className="text-xl text-center max-w-3xl mx-auto leading-relaxed">
            {content?.vision ||
              "To revolutionize education by creating a global platform that fosters collaboration, personal growth, and learning without boundaries, where individuals of all backgrounds can unlock opportunities and thrive in an ever-changing world."}
          </p>
        </div>
      </section>

      {/* IT Center Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-20 text-center">
            The IT Center: Empowering OpenEd&apos;s Educational Journey
            </h2>
          <p className="text-lg text-center max-w-4xl mx-auto mb-24 text-gray-700 leading-relaxed">
            The IT Center serves as the backbone of OpenEd, empowering students
            and staff with advanced technology solutions and support. Our
            dedicated team ensures a seamless digital experience, fostering
            innovation and excellence in education.
          </p>
          <h3 className="text-2xl font-bold mb-20 text-center">Our Staff</h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl justify-items-center">
              {(content?.teamMembers || defaultTeamMembers).map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full max-w-sm transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-lg font-semibold mb-2">
                      {member.name}
                    </h4>
                    <p className="text-sm text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <SolidButton />
    </div>
  );
};

export default AboutUs;
