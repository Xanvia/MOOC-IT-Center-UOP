// components/Sidebar.tsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 p-4 border-r border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Stats</h3>
        <div className="relative h-2 mt-2 bg-gray-300 rounded">
          <div className="absolute top-0 left-0 h-full bg-blue-600 rounded" style={{ width: '20%' }}></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">4 dari 20 video telah selesai</p>
      </div>
      <div className="mb-6">
        <h4 className="text-md font-medium">Intro</h4>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Perkenalan instruktur</p>
      </div>
      <div className="mb-6">
        <h4 className="text-md font-medium">Installation</h4>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Download Tools</p>
        <p className="mt-2 font-semibold text-blue-600 cursor-pointer">Instalasi Tools</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Basic Penggunaan Tools</p>
      </div>
      <div className="mb-6">
        <h4 className="text-md font-medium">Basic HTML</h4>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Tentang HTML</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Menjalankan Kode</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Tag</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Header dan Paragraf</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">List</p>
        <p className="mt-2 text-blue-600 cursor-pointer hover:underline">Table</p>
      </div>
    </div>
  );
};

export default Sidebar;
