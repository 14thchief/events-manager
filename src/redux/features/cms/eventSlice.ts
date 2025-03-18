import cmsApi from "../../api/cmsApi";
import { Event } from "./types/eventType";

const eventSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => ({
        url: `events`,
      }),
      transformResponse: (response: { data: Event[] }) => {
        const events = response.data?.sort(
          (a, b) => a.start_date - b.start_date
        );
        return events;
      },
      providesTags: ["events"],
    }),
    createEvent: builder.mutation({
      query: (data: Partial<Event>) => ({
        url: "events",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Event }) => {
        return response.data;
      },
      invalidatesTags: ["events"],
    }),
    editEvent: builder.mutation({
      query: (data: Partial<Event>) => ({
        url: `events/${data.id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Event }) => {
        return response.data;
      },
      invalidatesTags: ["events"],
    }),
    deleteEvent: builder.mutation({
      query: (data: Partial<Event>) => ({
        url: "events",
        method: "DELETE",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Event }) => {
        return response.data;
      },
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} = eventSlice;

export default eventSlice;
