import React from 'react';
import Head from 'next/head';
import { Menu, Search, Bell, User, Plus } from 'lucide-react';

const TeachersPage = () => {
  return (
    <div className="flex h-screen bg-white">
      <Head>
        <title>OpenEd - Teacher Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Teachers</h2>
              <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-100">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-sm text-gray-500">NAME</th>
                      <th className="text-left py-2 font-medium text-sm text-gray-500">Subject</th>
                      <th className="text-left py-2 font-medium text-sm text-gray-500">ROLE</th>
                      <th className="text-left py-2 font-medium text-sm text-gray-500">STATUS</th>
                      <th className="text-left py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Candice Schiner', company: 'Dell', role: 'Frontend Developer', status: 'Active' },
                      { name: 'John Doe', company: 'TechCorp', role: 'Backend Developer', status: 'Active' },
                      { name: 'Alice Johnson', company: 'WebTech', role: 'UI Designer', status: 'Active' },
                      { name: 'David Smith', company: 'Innovate Inc.', role: 'Fullstack Developer', status: 'Inactive' },
                      { name: 'Emma Wilson', company: 'TechGuru', role: 'Product Manager', status: 'Active' },
                      { name: 'James Brown', company: 'CodeGenius', role: 'QA Engineer', status: 'Active' },
                    ].map((user, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.company}</td>
                        <td className="py-2">{user.role}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-2 text-right">...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>0 of 10 row(s) selected.</span>
                  <div>
                    <button className="px-2 py-1 border border-gray-300 rounded-md mr-2">Previous</button>
                    <button className="px-2 py-1 border border-gray-300 rounded-md">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeachersPage;
