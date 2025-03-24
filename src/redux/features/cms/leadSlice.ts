import cmsApi from "../../api/cmsApi";
import { Lead } from "./types/leadType";

const leadSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => ({
        url: `leads`,
      }),
      transformResponse: (response: { data: Lead[] }) => {
        const leads = response.data?.sort((a, b) => b.id - a.id);
        return leads;
      },
      providesTags: ["leads"],
    }),
    createLead: builder.mutation({
      query: (data: Partial<Lead>) => ({
        url: "leads",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Lead }) => {
        return response.data;
      },
      invalidatesTags: ["leads"],
    }),
    editLead: builder.mutation({
      query: (data: Partial<Lead>) => ({
        url: `leads/${data.id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Lead }) => {
        return response.data;
      },
      invalidatesTags: ["leads"],
    }),
    deleteLead: builder.mutation({
      query: (id) => ({
        url: `leads/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: Lead }) => {
        return response.data;
      },
      invalidatesTags: ["leads"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useEditLeadMutation,
  useDeleteLeadMutation,
} = leadSlice;

export default leadSlice;
