import cmsApi from "../../api/cmsApi";
import { Contact } from "./types/contactType";

const contactSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => ({
        url: `contacts`,
      }),
      transformResponse: (response: { data: Contact[] }) => {
        const contacts = response.data?.sort((a, b) => b.id - a.id);
        return contacts;
      },
      providesTags: ["contacts"],
    }),
    createContact: builder.mutation({
      query: (data: Partial<Contact>) => ({
        url: "contacts",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Contact }) => {
        return response.data;
      },
      invalidatesTags: ["contacts"],
    }),
    editContact: builder.mutation({
      query: (data: Partial<Contact>) => ({
        url: `contacts/${data.id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Contact }) => {
        return response.data;
      },
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: Contact }) => {
        return response.data;
      },
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactSlice;

export default contactSlice;
