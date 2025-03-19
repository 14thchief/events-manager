import cmsApi from "../../api/cmsApi";
import { Coupon } from "./types/couponType";

const couponSlice = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query<Coupon[], void>({
      query: () => ({
        url: `coupons`,
      }),
      transformResponse: (response: { data: Coupon[] }) => {
        const coupons = response.data?.sort(
          (a, b) => a.expires_at - b.expires_at
        );
        return coupons;
      },
      providesTags: ["coupons"],
    }),
    createCoupon: builder.mutation({
      query: (data: Partial<Coupon>) => ({
        url: "coupons",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Coupon }) => {
        return response.data;
      },
      invalidatesTags: ["coupons"],
    }),
    editCoupon: builder.mutation({
      query: (data: Partial<Coupon>) => ({
        url: `coupons/${data.id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: Coupon }) => {
        return response.data;
      },
      invalidatesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `coupons/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: Coupon }) => {
        return response.data;
      },
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useEditCouponMutation,
  useDeleteCouponMutation,
} = couponSlice;

export default couponSlice;
