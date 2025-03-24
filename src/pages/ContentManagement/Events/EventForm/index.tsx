import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { BiLeftArrow } from "react-icons/bi";
import { regions } from "../../../../constants";
import DatePicker from "../../../../components/Forms/DatePicker";
import Button from "../../../../components/Button";
import EventDetailsModal, { Detail } from "./EventDetailsModal";
import {
  useCreateEventMutation,
  useEditEventMutation,
} from "../../../../redux/features/cms/eventSlice";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../../redux/features/util/actionModalSlice";
import { useGetCouponsQuery } from "../../../../redux/features/cms/couponSlice";

// List of keys representing individual detail fields in edit mode.
export const detailKeys = [
  "overview",
  "objectives",
  "hotel_benefits",
  "execution_plan",
  "investment_roi",
  "expected_outcome",
  "follow_up_strategies",
  "presentations_networking_opportunities",
  "prescheduled_meetings",
  "strategic_value_for_participants",
  "key_components_of_the_strategy",
  "roadshow",
  "strategic_locations",
  "potential_clients",
] as const;

interface EventFormState {
  event: string;
  segment: string;
  start_date: number;
  end_date: number;
  city: string;
  hotel_cost: number;
  type: string;
  region: string;
  coupon_id: string | number;
  details: Detail[];
}

// Extract detail fields from event data into a unified details array.
const extractDetails = (eventData: any): Detail[] => {
  return detailKeys.map((key) => ({
    type: key,
    value: eventData[key] || "",
  }));
};

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isEditing = Boolean(state?.event);
  const { data: coupons, isLoading: isCouponsLoading } = useGetCouponsQuery();
  const memoizedCoupons = useMemo(() => coupons, [coupons]);
  const activeCoupons = memoizedCoupons?.filter(
    (coupon) => coupon.status === "active"
  );

  const initialData = state?.event
    ? {
        ...state.event,
        hotel_cost: state.event.hotel_cost / 100,
        details: extractDetails(state.event),
      }
    : {
        event: "",
        segment: "",
        start_date: Math.floor(Date.now() / 1000),
        end_date: Math.floor(Date.now() / 1000) + 86400,
        city: "",
        hotel_cost: "",
        type: "",
        region: "",
        coupon_id: 0,
        details: [] as Detail[],
      };

  const [formData, setFormData] = useState<EventFormState>(initialData);
  const [showOtherDetails, setShowOtherDetails] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    overwriteValue?: any
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: overwriteValue ?? value }));
  };

  const handleDateChange = (name: string, timestamp: number) => {
    setFormData((prev) => ({ ...prev, [name]: timestamp }));
  };

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useEditEventMutation();
  // On submit, merge details back into event object (excluding the temporary details array)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { details, ...rest } = formData;
    const detailsObject = details.reduce(
      (acc, detail) => ({ ...acc, [detail.type]: detail.value }),
      {} as Record<string, string>
    );
    const submissionData: Record<string, any> = {
      ...rest,
      ...detailsObject,
    };
    submissionData.hotel_cost && (submissionData.hotel_cost *= 100);

    // API Call
    if (isEditing) {
      const realUpdate: Record<string, any> = {
        id: initialData?.id,
      };
      Object.entries(state?.event)?.forEach(([key, val]) =>
        submissionData[key] !== val
          ? (realUpdate[key] = submissionData[key])
          : null
      );

      updateEvent(realUpdate)
        .unwrap()
        .then(() => {
          dispatch(
            openActionModal({
              isOpen: true,
              type: "success",
              title: "Event Updated Successfully",
              content: <p>Event successfully updated!</p>,
              callback: () => navigate("/cms/events"),
              callbackText: "Continue",
            })
          );
          // navigate("/cms/events");
        })
        .catch((error) => console.error(error));
    } else {
      createEvent(submissionData)
        .unwrap()
        .then(() => {
          dispatch(
            openActionModal({
              isOpen: true,
              type: "success",
              title: "Event",
              content: <p>Event successfully created!</p>,
              callback: () => navigate("/cms/events"),
              callbackText: "Continue",
            })
          );
          // navigate("/cms/events");
        })
        .catch((error) => console.error(error));
    }
  };

  const filteredDetails = formData.details
    // Filter out details whose value is empty (after stripping HTML)
    .filter((x) => {
      const text = x.value.replace(/<[^>]*>/g, "").trim();
      return text.length > 0;
    });

  return (
    <div className="px-6 min-w-full moin-h-full flex flex-col gap-6 mx-auto">
      <div className="flex justify-between">
        <Link
          to="/cms/events"
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
              name="event"
              value={formData.event}
              onChange={handleChange}
              placeholder="Add Event Title"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              required
            />

            <input
              type="text"
              name="segment"
              value={formData.segment}
              onChange={handleChange}
              placeholder="Add Event Segment"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              required
            />

            <div className="flex gap-4">
              <DatePicker
                className="w-full focus:outline-primary"
                label="Start Date"
                name="start_date"
                timestamp={formData.start_date}
                onChange={handleDateChange}
              />
              <DatePicker
                className="w-full focus:outline-primary"
                label="End Date"
                name="end_date"
                timestamp={formData.end_date}
                onChange={handleDateChange}
              />
            </div>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Add Location"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              required
            />

            <input
              type="number"
              min="1"
              step="any"
              name="hotel_cost"
              value={formData.hotel_cost}
              onChange={(e) => handleChange(e, e.target.valueAsNumber)}
              placeholder="Add Price"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              required
            />

            <div className="flex flex-col gap-4 rounded border p-4">
              <div className="flex items-center gap-4">
                <span>Other Event Details:</span>
                <Button
                  text={
                    isEditing || formData.details.length > 0
                      ? "Edit Details"
                      : "Add Detail"
                  }
                  width="fit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowOtherDetails(true);
                  }}
                />
              </div>
              {formData.details?.length > 0 && (
                <ul className="flex flex-col gap-4">
                  {filteredDetails?.map((detail, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-1">
                        <span className="font-semibold capitalize">
                          {detail.type.split("_").join(" ")}
                        </span>
                        <div
                          className="whitespace-pre-wrap border rounded p-3"
                          dangerouslySetInnerHTML={{ __html: detail.value }}
                        ></div>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="sticky top-20 rounded border-t p-4 min-w-max flex-1 max-h-max lg:flex-none flex flex-col gap-4 shadow-md">
            <label className="flex flex-col gap-2 font-semibold">
              Event Type
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full lg:w-[300px] font-normal focus:outline-primary"
                required
              >
                <option value="">Select Type</option>
                <option value="APLBC representation">
                  APLBC Representation
                </option>
                <option value="Hotel attendance">Hotel Attendance</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 font-semibold">
              Event Region
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full font-normal focus:outline-primary"
                required
              >
                <option value="">Select Region</option>
                {regions.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 font-semibold">
              Select Coupon
              <select
                name="coupon_id"
                value={formData.coupon_id}
                onChange={(e) => handleChange(e, Number(e.target.value))}
                className="border p-2 rounded-lg w-full font-normal focus:outline-primary"
                disabled={isCouponsLoading}
              >
                <option value={0}>
                  {isCouponsLoading ? "Loading..." : "Select Coupon"}
                </option>
                {activeCoupons?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.code}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="bg-[#B29B4E] text-white w-full px-6 py-4 mt-4 rounded-lg"
            >
              {isCreating
                ? "Adding Event..."
                : isUpdating
                ? "Updating Event..."
                : isEditing
                ? "Save Update"
                : "Add Event"}
            </button>
          </div>
        </section>
      </form>

      {/* Render the Event Details Modal */}
      <EventDetailsModal
        isOpen={showOtherDetails}
        details={filteredDetails}
        onSave={(details: Detail[]) =>
          setFormData((prev) => ({ ...prev, details }))
        }
        onClose={() => setShowOtherDetails(false)}
      />
    </div>
  );
};

export default EventForm;
