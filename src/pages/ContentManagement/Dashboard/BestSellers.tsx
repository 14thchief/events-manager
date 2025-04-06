import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { bestSellingData, BestSellingItem } from "./data";

const BestSellers: React.FC = () => {
  // Convert the data to MUI X PieChart format
  // Each slice has { id, value }
  const pieData = bestSellingData.map((item) => ({
    id: item.label,
    value: item.value,
  }));

  return (
    <div className="rounded-lg shadow-lg border flex-1 flex flex-col items-center gap-4 h-full max-h-[440px] max-w-full xl:w-max xl:max-w-[374px] p-6 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <p className="font-[400]">Best Selling</p>
      </div>

      {/* Donut Chart & Legend Container */}
      <div className="space-y-6">
        {/* Donut Chart */}
        <div className="w-full flex-1 flex justify-center">
          <PieChart
            width={320}
            height={220}
            sx={{
              minWidth: "100%",
              minHeight: "100%",
            }}
            colors={["#B49C4F", "#4EBD326E", "#EA59594D", "#898787B5"]}
            series={[
              {
                data: pieData,
                innerRadius: 50, // adjust for "donut" thickness
                outerRadius: 100,
                cornerRadius: 2,
                // Color mapping for each slice
                // getColor: (item: any) => {
                //   const found = bestSellingData.find(
                //     (d) => d.label === item.id
                //   );
                //   return found?.color || "#ccc";
                // },
              },
            ]}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          />
        </div>

        {/* Legend */}
        <div className="w-full space-y-2 flex-1">
          {bestSellingData.map((item: BestSellingItem) => (
            <div key={item.label} className="flex items-center space-x-2">
              {/* Color Dot */}
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {/* Label */}
              <span className="text-gray-700 text-sm">{item.label}</span>
              {/* Percentage */}
              <span className="ml-auto text-gray-500 text-sm">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
