import React from "react";
import DataStatsOne from "@/components/DataStats/DataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from "@/components/layout/header";


const CourseSettingsPage: React.FC = () => {
  return (
    <div>
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          {/* <Header /> */}
        </div>
      <h1>Course Settings</h1>
      <p>Manage your course settings here.</p>
      
      <DataStatsOne />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
      </div>
    </div>
  );
};

export default CourseSettingsPage;
