"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Use dynamic imports to ensure these are only loaded on the client
const DataStatsOne = dynamic(() => import("@/components/DataStats/DataStats"), {
  ssr: false,
});
const ChartOne = dynamic(() => import("@/components/Charts/ChartOne"), {
  ssr: false,
});
const ChartTwo = dynamic(() => import("@/components/Charts/ChartTwo"), {
  ssr: false,
});

const AdminPage: React.FC = () => {
  return (
    <div>
      <DataStatsOne />
      <ChartOne />
      <ChartTwo />
    </div>
  );
};

export default AdminPage;
