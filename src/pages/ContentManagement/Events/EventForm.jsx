import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { BiLeftArrow } from "react-icons/bi";

const EventForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = Boolean(state?.event);
  const [formData, setFormData] = useState(
    state?.event || {
      title: "",
      segment: "",
      startDate: "",
      endDate: "",
      location: "",
      price: "",
      eventType: "",
      region: "",
      coupon: "000000",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
  };

  return (
    <div className="px-6 min-w-full flex flex-col gap-6 max-w-3xl mx-auto py-8">
      <div className="flex justify-between">
        <Link
          to={-1}
          className="flex items-center gap-2 text-gray-700 hover:text-yellow-600"
        >
          <BiLeftArrow /> Back
        </Link>
        <button
          type="button"
          onClick={() => navigate("/cms/events")}
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <h1 className="text-2xl font-bold">
        {isEditing ? "Edit Event" : "Add Event"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="flex gap-8 flex-wrap lg:flex-nowrap">
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Add Event Title"
              className="border p-2 rounded-lg w-full"
              required
            />

            <input
              type="text"
              name="segment"
              value={formData.segment}
              onChange={handleChange}
              placeholder="Add Event Segment"
              className="border p-2 rounded-lg w-full"
              required
            />

            <div className="flex gap-4">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Add Location"
              className="border p-2 rounded-lg w-full"
              required
            />

            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Add Price"
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="relative rounded border p-4 min-w-max flex-1 lg:flex-none flex flex-col gap-4">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Event Type"
              className="border p-2 rounded-lg w-full lg:w-[300px]"
              required
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Select Region"
              className="border p-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="coupon"
              value={formData.region}
              onChange={handleChange}
              placeholder="Add Coupon"
              className="border p-2 rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-[#B29B4E] text-white w-[90%] px-6 py-2 rounded-lg justify-self-end absolute bottom-4"
            >
              {isEditing ? "Save Event" : "Add Event"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EventForm;
