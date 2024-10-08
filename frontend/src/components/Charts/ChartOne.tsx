import React from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartOne: React.FC = () => {
  const series = [
    {
      name: "Total Students",
      data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
    },
    {
      name: "Total Teachers",
      data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
    },
  ];

  const options = {
    // ... your existing options ...
  };

  return (
    <div className="bg-slate-100 col-span-12 rounded-[10px] px-12 pb-6 pt-7 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Overview
          </h4>
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5 pt-5">
          <ApexCharts
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Total Students</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            4507
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Total Teachers</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            32
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;