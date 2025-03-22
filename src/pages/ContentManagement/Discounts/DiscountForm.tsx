import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { BiLeftArrow } from "react-icons/bi";
import { regions } from "../../../constants";
import DatePicker from "../../../components/Forms/DatePicker";
import Button from "../../../components/Button";
import {
  useCreateCouponMutation,
  useEditCouponMutation,
} from "../../../redux/features/cms/couponSlice";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";
import { Coupon } from "../../../redux/features/cms/types/couponType";

const CouponForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const coupon: Coupon = state?.coupon;
  const isEditing = Boolean(coupon);

  const initialData: Coupon = coupon
    ? {
        ...state.coupon,
        value:
          state.coupon.type === "percentage"
            ? state.coupon.value
            : state.coupon.value / 100,
        max_value: state.coupon.max_value / 100,
      }
    : {
        code: "",
        value: "",
        max_value: "",
        expires_at: Math.floor(Date.now() / 1000) + 86400,
        name: "",
        status: "inactive",
        type: "percentage",
      };

  const [formData, setFormData] = useState<Coupon>(initialData);

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

  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useEditCouponMutation();
  // On submit, merge details back into coupon object (excluding the temporary details array)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    submitData.max_value && (submitData.max_value *= 100);
    submitData.type != "percentage" && (submitData.value *= 100);

    // API Call
    if (isEditing) {
      const realUpdate: Record<string, any> = {
        id: initialData?.id,
      };
      Object.entries(coupon)?.forEach(([key, val]) =>
        submitData[key] !== val ? (realUpdate[key] = submitData[key]) : null
      );

      updateCoupon(realUpdate)
        .unwrap()
        .then(() => {
          dispatch(
            openActionModal({
              isOpen: true,
              type: "success",
              title: "Coupon Updated Successfully",
              content: <p>Coupon successfully updated!</p>,
              callback: () => navigate("/cms/discount"),
              callbackText: "Continue",
            })
          );
          // navigate("/cms/discount");
        })
        .catch((error) => console.error(error));
    } else {
      createCoupon(submitData)
        .unwrap()
        .then(() => {
          dispatch(
            openActionModal({
              isOpen: true,
              type: "success",
              title: "Coupon",
              content: <p>Coupon successfully created!</p>,
              callback: () => navigate("/cms/discount"),
              callbackText: "Continue",
            })
          );
          // navigate("/cms/discount");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="px-6 min-w-full flex flex-col gap-6 max-w-3xl mx-auto py-8">
      <div className="flex justify-between">
        <Link
          to="/cms/discount"
          className="flex items-center gap-2 text-gray-700 hover:text-yellow-600"
        >
          <BiLeftArrow /> Back
        </Link>
        <button
          type="button"
          onClick={() => navigate("/cms/discount")}
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <h1 className="text-2xl font-bold">
        {isEditing ? "Edit Coupon" : "Add Coupon"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="flex gap-8 flex-col lg:flex-row lg:flex-wrap">
          <div className="flex-1 flex flex-col gap-4">
            <label className="flex flex-col gap-2 font-semibold">
              Coupon Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Add Coupon Name"
                className="border p-2 rounded-lg w-full"
                required
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold">
              Coupon Code
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Add Coupon Code"
                className="border p-2 rounded-lg w-full"
              />
            </label>

            <div className="flex flex-wrap items-start gap-2 justify-between">
              <label className="w-full flex-1 flex flex-col gap-2 font-semibold">
                Coupon Type
                <select
                  name="type"
                  defaultValue={"percentage"}
                  value={formData.type}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full font-normal"
                  required
                >
                  <option value="percentage">Percentage Amount</option>
                  <option value="flat">Flat Amount</option>
                </select>
              </label>
              <label className="w-full flex-1 flex flex-col gap-2 font-semibold">
                Discount{" "}
                {formData.type == "percentage" ? "Percentage" : "Amount"}
                <input
                  name="value"
                  value={formData.value}
                  onChange={(e) => handleChange(e, e.target.valueAsNumber)}
                  type="number"
                  min="1"
                  max={formData.type === "percentage" ? 100 : undefined}
                  aria-invalid={
                    formData.type === "percentage" && formData.value > 100
                  }
                  className={`border p-2 rounded-lg w-full ${
                    formData.type === "percentage" && formData.value > 100
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formData.type === "percentage" && formData.value > 100 && (
                  <p className="text-red-500 text-sm">
                    Value cannot exceed 100%
                  </p>
                )}
              </label>
            </div>
            <label className="flex flex-col gap-2 font-semibold">
              Discount Cap
              <input
                type="number"
                min="1"
                step="any"
                name="max_value"
                value={formData.max_value}
                onChange={(e) => handleChange(e, e.target.valueAsNumber)}
                placeholder="Set Max Value"
                className="border p-2 rounded-lg w-full"
                required
              />
            </label>
          </div>

          <div className="sticky top-20 rounded border-t lg:border-t-0 py-4 lg:min-w-[400px] max-h-max lg:flex-none flex flex-col gap-4">
            <div className="flex flex-col gap-2 font-semibold">
              Expiry Date
              <DatePicker
                className="w-full"
                label=""
                name="expires_at"
                minDate={new Date().toISOString().split("T")[0]}
                timestamp={formData.expires_at}
                onChange={handleDateChange}
              />
            </div>
            <label className="flex flex-col gap-2 font-semibold">
              Coupon Status
              <select
                name="status"
                defaultValue={"inactive"}
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full font-normal"
                required
              >
                {["active", "inactive"].map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="bg-[#B29B4E] text-white w-full px-6 py-2 mt-4 rounded-lg"
            >
              {isEditing ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CouponForm;
