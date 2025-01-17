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
    imageUrl:
      "https://sci.pdn.ac.lk/scs/assets/img/staff/16-hakim.webp",
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
    window.location.href = 'http://www.ceit.pdn.ac.lk/';
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <button
          onClick={handleClick}
          className="bg-blue-950 hover:bg-blue-900 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105  mx-auto"
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
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/about-content/");
        setContent(response.data);
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
        className="bg-primary text-white py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">OpenEd: Transforming Education</h1>
              <p className="text-xl max-w-2xl">
                {content?.mission ||
                  "Our mission is to provide accessible, quality education to learners worldwide through innovative online learning experiences."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content?.stats || defaultStats).map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Vision</h2>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {content?.vision ||
              "To create a global learning community where knowledge is accessible to all, fostering innovation and lifelong learning through technology-enabled education."}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">STAFF MEMBERS OF THE IT CENTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content?.teamMembers || defaultTeamMembers).map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Button Section */}
      <SolidButton />
    </div>
  );
};

export default AboutUs;