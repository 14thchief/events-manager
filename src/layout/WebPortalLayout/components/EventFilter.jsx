// ./components/EventFilter.jsx
import React from "react";
import { mL } from "../../../constants";

function EventFilter({
  month,
  setMonth,
  type,
  setType,
  total,
  // selectedRegions and setSelectedRegions are handled in the sidebar component
}) {
  return (
    <>
      <section className="lg:max-w-[1240px] mx-auto lg:px-16 lg:py-12 px-6 py-6 flex flex-col gap-8">
        <p className="text-center font-bold">
          Welcome to APLBC's 2025 events calendar!
          <br />
          We invite you to explore our calendar of tradeshows, events, and sales
          blitz initiatives.
          <br />
          With limited spots available for enrollment, act quickly to:
        </p>
        <div className="bg-[#b49c4f] mx-auto w-max max-w-full px-12 py-2">
          <ul className="list-disc text-white font-bold">
            <li>Elevate your brand's visibility</li>
            <li>Expand market presence</li>
            <li>Connect with targeted audiences</li>
          </ul>
        </div>
      </section>

      <hr className="border-black my-4" />

      <section className="lg:max-w-[1240px] mx-auto text-center lg:px-16 px-6 py-6 flex flex-col gap-4">
        <p>
          Don't miss out! Secure your spot on a first-come, first-served basis
          and join us in driving business success.
          <br />
          <strong>Enrollments are open till December 20th 2024.</strong>
        </p>
        <p className="text-[#b49c4f] italic text-[17px]">
          Choose your events: Check the boxes next to the events you are
          interested in and click <span className="font-bold">"Accept"</span> to
          secure your spot.
        </p>
      </section>

      <section className="lg:max-w-[1240px] mx-auto mb-10 lg:px-16 px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap-reverse">
          <label className="flex flex-col gap-1">
            Select Month
            <select
              className="w-[200px] p-2 rounded border"
              value={month}
              onChange={({ target }) => setMonth(target.value)}
            >
              <option value="">All</option>
              {mL.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Select Event Type
            <select
              className="w-[200px] p-2 rounded border"
              value={type}
              onChange={({ target }) => setType(target.value)}
            >
              <option value="">All</option>
              {["APLBC representation", "Hotel attendance"].map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="flex-1 flex gap-2 items-center justify-between lg:justify-end flex-wrap lg:flex-nowrap min-w-full lg:min-w-max">
            <h2 className="font-bold text-lg lg:text-right">
              Subtotal
              <br />
              <span className="font-light">£{(total / 100).toFixed(2)}</span>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventFilter;
