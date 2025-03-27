import { LineChart } from "@mui/x-charts/LineChart";
import { mS } from "../../constants";

const dataset = [
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
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: "x",
          data: dataset.map((x) => x.x),
          valueFormatter: (idx) => mS[idx],
        },
      ]}
      series={[{ curve: "linear", color: "#B49C4F", dataKey: "y" }]}
      height={190}
    />
  );
}
