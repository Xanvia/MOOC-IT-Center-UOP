import React from 'react'
import Head from 'next/head';

const Profile = () => {
  return (
    <div>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="User Profile Page" />
      </Head>
      <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 rounded-full"
              src="/path-to-your-profile-pic.jpg"
              alt="Profile Picture"
            />
            
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium">About Me</h3>
            <p className="text-gray-700 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium">Courses</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
