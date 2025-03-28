import React from "react";
import { Activity } from "./data";

interface RecentActivityTableProps {
  activities: Activity[];
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({
  activities,
}) => {
  return (
    <div className="rounded-lg shadow-lg border flex max-w-full p-8 flex-1 flex flex-wrap items-center gap-4 bg-white">
      <p className="font-[400]">Recent Activity</p>

      <table className="w-full border-collapse text-left">
        {/* Table Head */}
        <thead>
          <tr className="border-b">
            <th className="py-2 font-medium text-gray-600">Name</th>
            <th className="py-2 font-medium text-gray-600">Company</th>
            <th className="py-2 font-medium text-gray-600">Payment</th>
            <th className="py-2 font-medium text-gray-600">Event</th>
            <th className="py-2 font-medium text-gray-600">Time</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              {/* Name & Email */}
              <td className="py-3">
                <p className="font-semibold text-gray-800">{activity.name}</p>
                <p className="text-sm text-gray-500">{activity.email}</p>
              </td>

              {/* Company */}
              <td className="py-3 text-gray-700">{activity.company}</td>

              {/* Payment */}
              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${
                      activity.payment === "Invoice"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }
                  `}
                >
                  {activity.payment}
                </span>
              </td>

              {/* Event */}
              <td className="py-3 text-gray-700">{activity.event}</td>

              {/* Time */}
              <td className="py-3 text-gray-700">{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
