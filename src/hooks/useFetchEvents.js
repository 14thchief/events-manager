import { useState, useEffect } from "react";

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://api.aplbcevents.com:8080/events`);
        const { data } = await response.json();
        setEvents(data.sort((a, b) => a.start_date - b.start_date));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return { events, loading, error };
};
