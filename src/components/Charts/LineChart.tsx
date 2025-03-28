import { LineChart } from "@mui/x-charts/LineChart";
import { mS as months } from "../../constants";

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

export default function LineChartComponent() {
  return (
    <div>
      <LineChart
        grid={{ horizontal: false, vertical: false }} // Remove grid lines
        // width={600}
        height={190}
        dataset={chartData}
        series={[
          {
            dataKey: "y",
            label: "Revenue",
            color: "#B49C4F", // Use primary color for the line
            showMark: false, // Show points
            curve: "linear",
          },
        ]}
        xAxis={[
          {
            dataKey: "x",
            scaleType: "band",
            valueFormatter: (value: number) => months[value], // Format x-axis labels
            disableTicks: true, // Hide x-axis ticks
            disableLine: false, // Hide x-axis line
            tickLabelStyle: { fill: "gray" }, // Set text color for labels
          },
        ]}
        yAxis={[
          {
            hideTooltip: true,
            disableLine: true, // Hide y-axis line
            disableTicks: true, // Hide y-axis ticks
            tickLabelStyle: { fill: "gray" }, // Set text color for labels
          },
        ]}
      />
    </div>
  );
}
