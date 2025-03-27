const DashboardCard = ({ imageSrc, title, description, bgColor }: any) => {
  return (
    <div className="rounded-lg shadow-lg border-t-0.25 flex-1 flex gap-4 w-[267px] h-[134px] p-6 bg-white ">
      <div
        className="rounded-full min-w-[41px] w-[41px] min-h-[41px] h-[41px] flex justify-center items-center"
        style={{ background: bgColor }}
      >
        <img src={imageSrc} alt="icon" className="max-w-full max-h-full" />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-[37px] font-bold">{title}</h1>
        <p className="text-[14px] font-[300] text-[#515151] min-w-[100px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
