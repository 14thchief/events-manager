import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  Select,
} from "@mui/material";
import LineChartComponent from "../../../components/Charts/LineChart";

const RevenueGrowthCard: React.FC = () => {
  const [range, setRange] = useState<string>("1h");

  // Sample data with x=0..11, y in thousands
  const chartData = [
    { x: 0, y: 7423 },
    { x: 1, y: 8651 },
    { x: 2, y: 9732 },
    { x: 3, y: 6348 },
    { x: 4, y: 8123 },
    { x: 5, y: 1001 },
    { x: 6, y: 7643 },
    { x: 7, y: 8923 },
    { x: 8, y: 6567 },
    { x: 9, y: 7452 },
    { x: 10, y: 8974 },
    { x: 11, y: 9321 },
  ];

  // Month labels for x-axis
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string
  ) => {
    if (newRange) {
      setRange(newRange);
    }
  };

  const [selectedTime, setSelectedTime] = useState("1h");

  return (
    <div className="rounded-lg shadow-lg border flex-1 flex flex-col h-max max-w-full xl:w-[560px] 2xl:max-w-full min-w-[320px] p-4 bg-white">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full h-max">
          <p className="font-[400]">Revenue Growth</p>
          <h2 className="text-[24px] font-bold">{"$18,000"}</h2>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          {/* Date Button */}
          <select
            style={{
              textTransform: "none",
              borderWidth: 1,
              borderColor: "#B49C4F",
              color: "#B49C4F",
              height: 20,
              borderRadius: 50,
              fontSize: 8,
            }}
          >
            <option>Date</option>
          </select>

          {/* Toggle Buttons for Ranges */}
          <ToggleButtonGroup
            value={range}
            exclusive
            onChange={handleRangeChange}
            aria-label="time range"
          >
            {["1h", "3h", "1d", "1w", "1m"].map((item) => {
              const isSelected = item === selectedTime;
              return (
                <button
                  key={item}
                  value={item}
                  aria-label={item}
                  className="flex justify-center items-center"
                  onClick={() => setSelectedTime(item)}
                  style={{
                    textTransform: "none",
                    borderColor: "#B49C4F",
                    borderRadius: 50,
                    marginRight: 2,
                    height: 20,
                    fontSize: 8,
                    color: isSelected ? "#fff" : "#B49C4F",
                    backgroundColor: isSelected ? "#B49C4F" : "transparent",
                    // "&.Mui-selected": {
                    //   backgroundColor: "#B49C4F",
                    //   color: "#fff",
                    // },
                  }}
                >
                  {item}
                </button>
              );
            })}
          </ToggleButtonGroup>
        </Box>
      </div>
      <LineChartComponent />
    </div>
  );
};

export default RevenueGrowthCard;
