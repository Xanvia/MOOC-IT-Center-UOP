"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Import loading components
const LoadingStats = () => (
  <div className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
);

const LoadingChart = () => (
  <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
);

// Dynamic imports
const DataStatsTwo = dynamic(
  () => import("@/components/DataStats/DataStatsTwo"),
  {
    ssr: false,
    loading: () => <LoadingStats />,
  }
);

const ChartOne = dynamic(() => import("@/components/Charts/ChartOne"), {
  ssr: false,
  loading: () => <LoadingChart />,
});

const ChartTwo = dynamic(() => import("@/components/Charts/ChartTwo"), {
  ssr: false,
  loading: () => <LoadingChart />,
});

const CourseSettingsPage = ({ params }: { params: { courseId: string } }) => {
  const id = params.courseId;
  return (
    <div className="bg-slate-100">
      <Suspense fallback={<LoadingStats />}>
        <DataStatsTwo id={id} />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <Suspense fallback={<LoadingChart />}>
          <ChartOne />
        </Suspense>
        <Suspense fallback={<LoadingChart />}>
          <ChartTwo />
        </Suspense>
      </div>
    </div>
  );
};

export default CourseSettingsPage;
