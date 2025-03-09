import cmsApi from "../../api/cmsApi";

const eventSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: `events`,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["events"],
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: "events",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response) => {
        return response.data;
      },
      invalidatesTags: ["events"],
    }),
  }),
});

export const { useGetEventsQuery, useCreateEventMutation } = eventSlice;

export default eventSlice;
