import cmsApi from "../../api/cmsApi";

const bulkUploadSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    bulkUpload: builder.mutation({
      query: (data: { endpoint: string; formData: any[] }) => ({
        url: `${data.endpoint}`,
        method: "POST",
        body: { data: data.formData },
      }),
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      invalidatesTags: ["contacts", "coupons", "events", "leads"],
    }),
  }),
});

export const { useBulkUploadMutation } = bulkUploadSlice;

export default bulkUploadSlice;
