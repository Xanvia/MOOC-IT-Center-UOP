import React from 'react';
import Head from 'next/head';
import { Plus } from 'lucide-react';

const TeachersPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Teacher Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Teachers</h2>
          <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add New Teacher
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Scrollable Table Section */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-auto max-h-[480px]">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                    COURCE
                  </th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                    FACULTY
                  </th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                    DEPARTMENT
                  </th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Candice Schiner', cource: 'Introduction to computer network', faculty: 'Faculty of Science', department: 'Statistic and computer Science', status: 'Active' },
                  { name: 'John Doe', cource: 'Material Science', faculty: 'Faculty of Engineering', department: 'Civil Engineering',status: 'Active' },
                  { name: 'Alice Johnson', cource: 'Microscopy', faculty: 'Faculty of Medicine', department: 'Anatomy',status: 'Active' },
                  { name: 'David Smith', cource: 'Analytical Chemistry', faculty: 'Faculty of Science', department: 'Chemistry',status: 'Inactive' },
                  { name: 'Emma Wilson', cource: 'Advanced Human Geography', faculty: 'Faculty of Arts', department: 'Geography',status: 'Active' },
                  { name: 'James Brown', cource: 'Animal By-product Technology', faculty: 'Faculty of Agriculture', department: 'Animal Science',status: 'Active' },
                  { name: 'Laura White', cource: 'Fluids Mechanics I', faculty: 'Faculty of Engineering', department: 'Mechanical Engineering',status: 'Active' },
                  { name: 'Michael Green', cource: 'Immunology', faculty: 'Faculty of Dental Sciences', department: 'Veterinary Pathobiology',status: 'Inactive' },
                  { name: 'Sarah Black', cource: 'Negotiation & Conflict Management', faculty: 'Faculty of Management', department: 'Human Resource Management',status: 'Active' },
                  { name: 'Robert Gray', cource: ' Physiotherapy in Geriatrics', faculty: 'Faculty of Allied Health Sciences', department: 'Physiotherapy',status: 'Active' },
                ].map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.cource}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.faculty}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>0 of 10 row(s) selected.</span>
          <div>
            <button className="px-3 py-1 border border-gray-300 rounded-md mr-2">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">Next</button>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default TeachersPage;
