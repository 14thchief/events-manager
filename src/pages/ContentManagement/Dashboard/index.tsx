import reg from "../../../assets/svg/dashboard_registrations.svg";
import visitors from "../../../assets/svg/dashboard_visitors.svg";
import trolley from "../../../assets/svg/dashboard_trolley.svg";
import DashboardCard from "./Cards";
import LineChartComponent from "../../../components/Charts/LineChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 flex max-w-[560px] flex-wrap items-center gap-4">
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
        <div className="rounded-lg shadow-lg border flex-1 flex flex-col h-max max-w-[560px] min-w-[320px] lg:min-w-max p-4 bg-white">
          <div className="w-full h-max">
            <p className="font-[400]">Revenue Growth</p>
            <h2 className="text-[24px] font-bold">{"$18,000"}</h2>
          </div>
          <div className="flex-1">
            <LineChartComponent />
          </div>
        </div>
      </div>
      <div className="flex-1 flex gap-4">
        <div className="rounded-lg shadow-lg border flex max-w-full p-8 flex-1 flex flex-wrap items-center gap-4 bg-white">
          <div className="w-full h-max">
            <p className="font-[400]">Recent Activity</p>
          </div>
        </div>
        <div className="rounded-lg shadow-lg border flex max-w-[374px] p-8 flex-1 flex flex-wrap items-center gap-4 bg-white">
          <div className="w-full h-max">
            <p className="font-[400]">Best Selling</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
