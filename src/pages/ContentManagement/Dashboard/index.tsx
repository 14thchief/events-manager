import reg from "../../../assets/svg/dashboard_registrations.svg";
import visitors from "../../../assets/svg/dashboard_visitors.svg";
import trolley from "../../../assets/svg/dashboard_trolley.svg";
import DashboardCard from "./Cards";
import LineChartComponent from "../../../components/Charts/LineChart";
import RevenueGrowthCard from "./RevenueGrowth";
import RecentActivityTable from "./RecentActivity";
import { recentActivities } from "./data";
import BestSellers from "./BestSellers";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h1 className="text-[24px] font-[400]">Performance Overview</h1>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex max-w-full xl:max-w-[560px] flex-wrap items-center gap-4">
          <DashboardCard
            title={"$200"}
            description={"Total No of Registration"}
            imageSrc={reg}
            bgColor={"#EA59594D"}
          />
          <DashboardCard
            title={"1,200"}
            description={"Site Visitors"}
            imageSrc={visitors}
            bgColor={"#4EBD326E"}
          />
          <DashboardCard
            title={"113"}
            description={"Event sold by Invoice"}
            imageSrc={trolley}
            bgColor={"#D8BD648A"}
          />
          <DashboardCard
            title={"99"}
            description={"Event sold Online"}
            imageSrc={trolley}
            bgColor={"#D8BD648A"}
          />
        </div>
        <RevenueGrowthCard />
      </div>
      <div className="flex-1 flex flex-wrap gap-4">
        <RecentActivityTable activities={recentActivities} />
        <BestSellers />
      </div>
    </div>
  );
};

export default Dashboard;
