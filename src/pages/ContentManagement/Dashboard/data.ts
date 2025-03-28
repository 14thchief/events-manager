export interface Activity {
  name: string;
  email: string;
  company: string;
  payment: "Invoice" | "Online";
  event: string;
  time: string;
}

export const recentActivities: Activity[] = [
  {
    name: "Sandra Bekoe",
    email: "SandraBekoe@gmail.com",
    company: "Microsoft",
    payment: "Invoice",
    event: "DDPL event 121 meeting",
    time: "9:00 AM",
  },
  {
    name: "Michael Lakes",
    email: "michaellakes@gmail.com",
    company: "Starks Creatives",
    payment: "Online",
    event: "India Sales Blitz - 5 days",
    time: "10:30 AM",
  },
  {
    name: "Michael Lakes",
    email: "michaellakes@gmail.com",
    company: "Microsoft",
    payment: "Invoice",
    event: "DDPL event 121 meeting",
    time: "11:00 AM",
  },
  {
    name: "Michael Lakes",
    email: "michaellakes@gmail.com",
    company: "Starks Creatives",
    payment: "Online",
    event: "India Sales Blitz - 5 days",
    time: "1:00 PM",
  },
  {
    name: "Michael Lakes",
    email: "michaellakes@gmail.com",
    company: "Microsoft",
    payment: "Invoice",
    event: "DDPL event 121 meeting",
    time: "2:15 PM",
  },
  {
    name: "Michael Lakes",
    email: "michaellakes@gmail.com",
    company: "Starks Creatives",
    payment: "Online",
    event: "India Sales Blitz - 5 days",
    time: "4:00 PM",
  },
];

// bestSellingData.ts

export interface BestSellingItem {
  label: string;
  value: number; // percentage
  color: string;
}

export const bestSellingData: BestSellingItem[] = [
  {
    label: "DDPL 121 event Meeting",
    value: 52.1,
    color: "#B49C4F", // gold
  },
  {
    label: "India Sales Blitz - 5 days",
    value: 22.8,
    color: "#9CD99A", // greenish
  },
  {
    label: "Travel Bulletin",
    value: 13.9,
    color: "#FFCACA", // pastel red/pink
  },
  {
    label: "Other",
    value: 11.2,
    color: "#C1C1C1", // gray
  },
];
