import { useMemo, useState } from "react";
import AccordionUI from "../../../components/AccordionUI";
import { fields, mS } from "../../../constants.tsx";
import { Link, useLocation } from "react-router";
import { BiLeftArrow } from "react-icons/bi";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { useGetCouponsQuery } from "../../../redux/features/cms/couponSlice";

const EventDetails = () => {
  const { state } = useLocation();
  const data = state?.event;
  const { data: coupons } = useGetCouponsQuery();
  const memoizedCoupons = useMemo(() => coupons, [coupons]);
  const eventCoupon = memoizedCoupons?.find(
    (coupon) => coupon.id === data.coupon_id
  );

  const collapsibleFields = fields.filter((x) => data?.[x.key]);

  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => {
    const newExpanded = expanded !== panel;
    setExpanded(newExpanded ? panel : null);
  };
  return (
    <div className="px-6 flex flex-col gap-8 max-w-full  mx-auto">
      <Link
        to={-1}
        className="flex items-center gap-2 max-w-max bg-transparent p-0 text-black hover:text-[#B29B4E]"
      >
        <BiLeftArrow /> Back
      </Link>

      <div className="flex flex-col-reverse lg:flex-row gap-8 items-start">
        <main className="flex-1 no-scrollbar">
          <h1 className="text-2xl font-bold">{data?.event}</h1>
          <p className="text-gray-600 mb-4">{data?.segment}</p>

          <section
            className={`mb-6 flex flex-col gap-1 ${
              data?.overview ? "" : "hidden"
            }`}
          >
            <h2 className="text-xl font-semibold">Overview</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p
                className="!whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: data?.overview }}
              ></p>
            </div>
          </section>

          <section
            className={`mb-6 flex flex-col gap-1 ${
              data?.objectives ? "" : "hidden"
            }`}
          >
            <h2 className="text-xl font-semibold">Objectives</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p
                className="!whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: data?.objectives }}
              ></p>
            </div>
          </section>

          <section className="mb-6 flex flex-col gap-4">
            {collapsibleFields?.map((item, i) => {
              return (
                <AccordionUI
                  expanded={expanded === item.name}
                  onExpanded={handleChange}
                  title={item.name}
                  content={data?.[item.key]}
                  key={i}
                />
              );
            })}
          </section>
        </main>

        <section className="lg:sticky lg:top-20 w-full lg:w-max mb-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{data?.type}</h3>
          <div className="space-y-1">
            <p className="text-gray-700 font-medium">Location</p>
            <div className="bg-gray-100 p-2 rounded-lg">
              {data?.city}, {data?.region}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-700 font-medium">Date</p>
            <div className="bg-gray-100 p-2 rounded-lg">
              <p className="uppercase text-[15px] min-w-max">
                {data?.start_date ? (
                  <span>
                    {mS[new Date(data?.start_date * 1000).getMonth()]}{" "}
                    {new Date(data?.start_date * 1000).getDate()}
                  </span>
                ) : (
                  "TBA"
                )}
                {data?.end_date !== data?.start_date && (
                  <span>
                    <span className="mx-[4px] min-w-max">-</span>
                    {new Date(data?.end_date * 1000).getDate()}{" "}
                    {mS[new Date(data?.end_date * 1000).getMonth()]}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-700 font-medium">Hotel Cost</p>
            <div className="bg-gray-100 p-2 rounded-lg">
              {formatCurrency(data?.hotel_cost / 100, "GBP")}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-700 font-medium">Coupon Code</p>
            <div className="bg-[#B29B4E] text-white p-2 rounded-lg font-bold">
              {eventCoupon?.code ?? "N/A"}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetails;
