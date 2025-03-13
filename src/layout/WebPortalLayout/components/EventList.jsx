// ./components/EventList.jsx
import { mS } from "../../../constants";

function EventList({
  events,
  selectedEvents,
  setSelectedEvents,
  setHighlightedEvent,
  setOpen,
  acceptRef,
}) {
  const handleSelectEvent = (data) => {
    setSelectedEvents((prev) => {
      if (prev.find((item) => item.event === data.event)) {
        return prev.filter((item) => item.event !== data.event);
      }
      return [...prev, data];
    });
  };

  const total = selectedEvents
    .map((x) => x.hotel_cost)
    .reduce((a, b) => a + b, 0);

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events);
      acceptRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-full xl:max-w-[1240px] mx-auto mb-10 xl:px-16 px-6 py-6 flex-1 flex flex-col gap-6 md:flex-row md:justify-end">
      <div className="flex-1 flex flex-col items-end gap-4 max-w-max">
        <div className="flex items-center gap-4 xl:w-[700px] min-w-[100%]">
          <div
            className="flex items-center gap-4 w-full cursor-pointer"
            onClick={handleSelectAll}
          >
            <div
              type="checkbox"
              className={`rounded border h-5 w-5 ${
                selectedEvents.length === events.length
                  ? "bg-[#b49c4f]"
                  : "bg-gray-200"
              }`}
            />
            <h2 className="text-xl">Select All</h2>
          </div>
          {!!selectedEvents.length && (
            <button
              onClick={() => setSelectedEvents([])}
              className="min-w-max text-[16px] text-white bg-red-500"
            >
              Clear ({selectedEvents.length} selection
              {selectedEvents.length > 1 ? "s" : ""})
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4 max-h-[80vh] overflow-auto xl:w-[700px]">
          {events.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 bg-gray-200 p-4 max-w-full h-auto cursor-pointer"
              onClick={() => handleSelectEvent(item)}
            >
              <div className="flex flex-col gap-4 basis-auto">
                <div
                  type="checkbox"
                  className={`rounded border h-5 w-5 ${
                    selectedEvents.find((i) => i.event === item.event)
                      ? "bg-[#b49c4f]"
                      : "bg-white"
                  }`}
                />
                <p className="text-[#b49c4f] uppercase text-[15px] font-bold">
                  {item.start_date ? (
                    <span>
                      {mS[new Date(item.start_date * 1000).getMonth()]}
                      <br />
                      {new Date(item.start_date * 1000).getDate()}
                    </span>
                  ) : (
                    "TBA"
                  )}
                  {item.end_date !== item.start_date && (
                    <span>
                      <span className="mx-[4px]">-</span>
                      {new Date(item.end_date * 1000).getDate()}
                      <br />
                      {mS[new Date(item.end_date * 1000).getMonth()]}
                    </span>
                  )}
                </p>
              </div>

              <div className="w-full">
                <p className="w-full flex justify-between items-center gap-2">
                  <strong>{item.event}</strong>
                  <small className="capitalize">{item.type}</small>
                </p>
                <small>{item.segment}</small>
                <br />
                <small>
                  <strong>{item.city}</strong>
                </small>
                <div className="mt-4 flex justify-between items-center w-full">
                  <strong>£{(item.hotel_cost / 100).toFixed(2)}</strong>
                  {(!!item.overview || !!item.objectives) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHighlightedEvent(item);
                      }}
                      className="underline bg-transparent p-0 hover:text-[#b49c4f]"
                    >
                      More Info
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-start w-full">
          <button
            ref={acceptRef}
            className={`w-full md:w-[400px] md:h-[60px] float-left flex justify-between items-center gap-2 font-bold text-[20px] ${
              total ? "bg-[#b49c4f]" : "bg-gray-200"
            }`}
            onClick={() => {
              total
                ? setOpen(true)
                : alert("You must select at least one event to continue.");
            }}
            disabled={total === 0}
          >
            Accept
            <span className="font-normal">£{(total / 100).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventList;
