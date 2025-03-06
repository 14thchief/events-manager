// ./components/SelectedEvents.jsx
import React from "react";

function SelectedEvents({
  selectedRegions,
  setSelectedRegions,
  selectedEvents,
}) {
  const regions = ["Africa", "Asia", "America", "EMEA", "UK"];

  const handleSelectRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region]
    );
  };

  return (
    <div className="md:max-w-[40%] xl:max-w-[1240px] xl:mx-auto mb-10 xl:px-16 px-6 py-6 flex flex-col gap-6 xl:flex-row">
      <div className="w-max max-w-full h-max flex flex-col gap-4 xl:basis-[28%] xl:basis-[20%]">
        <h2 className="font-bold text-lg">Region</h2>
        <div className="flex flex-col gap-1">
          {regions.map((item, i) => (
            <label
              key={i}
              className="flex gap-4"
              onClick={() => handleSelectRegion(item)}
            >
              <div
                type="checkbox"
                name={item}
                className={`rounded border h-5 w-5 ${
                  selectedRegions.includes(item)
                    ? "bg-[#b49c4f]"
                    : "bg-gray-200"
                }`}
              />
              {item}
            </label>
          ))}
        </div>
        <div className="h-max">
          <strong>Selected Events</strong>
          <ul className="list-disc list-inside">
            {selectedEvents.map(({ event }, i) => (
              <li key={i}>
                <small>{event}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* The right column will be rendered by the EventList component */}
    </div>
  );
}

export default SelectedEvents;
