import "./styles.css";
import { useEffect, useRef, useState } from "react";
import FormDialog from "../../components/Dialogue";
import toast, { Toaster } from "react-hot-toast";
import InfoModal from "../../components/InfoModal";
import Header from "./components/Header";
import EventFilter from "./components/EventFilter";
import SelectedEvents from "./components/SelectedEvents";
import EventList from "./components/EventList";

const API_BASE = "https://api.aplbcevents.com:8080";

function WebPortalLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const [error, setError] = useState("");
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const acceptRef = useRef(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const result = await fetch(`${API_BASE}/events`, { method: "GET" });
      const { data } = await result.json();
      const sortedData = data.sort((a, b) => a.start_date - b.start_date);
      setEvents(sortedData);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const acceptEvents = async (formJSON) => {
    const loadingToast = toast.loading("Submitting request...");
    try {
      await fetch(`${API_BASE}/acceptance`, {
        method: "POST",
        body: JSON.stringify({
          ...formJSON,
          events: selectedEvents.map((x) => x.id),
        }),
      });
      setSelectedEvents([]);
      toast.dismiss(loadingToast);
      toast.success("Submitted Successfully");
      setOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      setError("Submission not successful, Please try again");
      console.error(error);
    }
  };

  const total = selectedEvents
    .map((x) => x.hotel_cost)
    .reduce((a, b) => a + b, 0);

  // Filter events based on month, region, and type
  const filteredEvents = events.filter((item) => {
    return (
      (!month || item.month === month) &&
      (!selectedRegions.length || selectedRegions.includes(item.region)) &&
      (!type || item.type.toLowerCase() === type.toLowerCase())
    );
  });

  return (
    <div className="w-full max-w-full">
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <EventFilter
        month={month}
        setMonth={setMonth}
        type={type}
        setType={setType}
        total={total}
      />
      <div className={`flex flex-col md:flex-row`}>
        <SelectedEvents
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          selectedEvents={selectedEvents}
        />
        <EventList
          events={filteredEvents}
          selectedEvents={selectedEvents}
          setSelectedEvents={setSelectedEvents}
          setHighlightedEvent={setHighlightedEvent}
          acceptRef={acceptRef}
          setOpen={setOpen}
        />
      </div>

      <FormDialog
        total={`£${(total / 100).toFixed(2)}`}
        open={open}
        setOpen={setOpen}
        error={error}
        setError={setError}
        handleSubmit={acceptEvents}
      />

      <InfoModal
        data={highlightedEvent}
        isAccepted={selectedEvents?.find(
          (x) => x.event === highlightedEvent?.event
        )}
        onAccept={(data) => {
          typeof data === "string"
            ? setSelectedEvents((prev) => prev.filter((x) => x.event !== data))
            : setSelectedEvents((prev) => [...prev, data]);
        }}
        total={`£${(highlightedEvent?.hotel_cost / 100).toFixed(2)}`}
        open={!!highlightedEvent}
        setOpen={setHighlightedEvent}
        error={error}
        setError={setError}
        handleSubmit={acceptEvents}
      />

      <footer className="bg-primary flex flex-col items-center text-white">
        <div className="flex flex-col items-center pt-6">
          <p>Have questions about an event?</p>
          <p>
            Contact us at{" "}
            <a
              href="mailto:events@ap-lbc.com"
              className="!text-white underline"
            >
              events@ap-lbc.com
            </a>{" "}
            for assistance.
          </p>
          <p>Our team is here to help.</p>
        </div>
        <p className="!font-light text-sm pt-2 pb-6">
          Visit our website:{" "}
          <a
            href="https://www.ap-lbc.com"
            className="!text-white !font-light cursor-pointer"
            target="_blank"
          >
            www.ap-lbc.com
          </a>
        </p>
        <div className="bg-white text-[#8e7c3f] flex justify-between items-center w-full px-4 md:px-12 py-2">
          <small>All rights reserved copyright 2024</small>
          <small>Made by Starks IT</small>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}

export default WebPortalLayout;
