import { useLocation, useNavigate, Link } from "react-router";
import { BiLeftArrow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import {
  useCreateLeadMutation,
  useEditLeadMutation,
} from "../../../../redux/features/cms/leadSlice";
import { openActionModal } from "../../../../redux/features/util/actionModalSlice";
import { Lead } from "../../../../redux/features/cms/types/leadType";

// Create a form-specific type by omitting the fields not in the form (e.g. "id")
type LeadFormValues = Omit<Lead, "id">;

// Validation schema using Yup
const leadSchema = yup.object().shape({
  name: yup.string().required("Lead name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  company: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  designation: yup.string().required("Designation name is required"),
  events: yup.array().default([]),
});

const LeadForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isEditing = Boolean(state?.lead);

  // Prepare default values ensuring "id" is omitted
  const defaultValues: LeadFormValues = isEditing
    ? {
        name: state.lead.name,
        email: state.lead.email,
        phone_number: state.lead.phone_number,
        company: state.lead.company,
        designation: state.lead.designation,
        location: state.lead.location,
        events: state.lead.events,
      }
    : {
        name: "",
        email: "",
        phone_number: "",
        company: "",
        designation: "",
        location: "",
        events: [],
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: yupResolver(leadSchema),
    defaultValues,
  });

  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();
  const [updateLead, { isLoading: isUpdating }] = useEditLeadMutation();

  const onSubmit = async (data: LeadFormValues) => {
    try {
      if (isEditing) {
        // Prepare update data including the id
        const updatedData: Record<string, any> = { id: state.lead.id };
        Object.entries(state.lead).forEach(([key, val]) => {
          if (key !== "id" && data[key as keyof LeadFormValues] !== val) {
            updatedData[key] = data[key as keyof LeadFormValues];
          }
        });

        await updateLead(updatedData).unwrap();
      } else {
        await createLead(data).unwrap();
      }

      dispatch(
        openActionModal({
          isOpen: true,
          type: "success",
          title: isEditing
            ? "Lead Updated Successfully"
            : "Lead Created Successfully",
          content: (
            <p>Lead successfully {isEditing ? "updated" : "created"}!</p>
          ),
          callback: () => navigate("/cms/leads"),
          callbackText: "Continue",
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-6 min-w-full min-h-full flex flex-col gap-6 mx-auto">
      <div className="flex justify-between">
        <Link
          to="/cms/leads"
          className="flex items-center gap-2 text-gray-700 hover:text-yellow-600"
        >
          <BiLeftArrow /> Back
        </Link>
        <button
          type="button"
          onClick={() => navigate("/cms/leads")}
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <h1 className="text-2xl font-bold">
        {isEditing ? "Edit Lead" : "Add Lead"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border w-full max-w-[1000px] p-4 lg:p-8"
      >
        {/* Name Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="name" className="w-1/3 font-medium">
            Name
          </label>
          <div className="w-2/3">
            <input
              id="name"
              type="text"
              placeholder="Add Lead Name"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-1/3 font-medium">
            Email
          </label>
          <div className="w-2/3">
            <input
              id="email"
              type="email"
              placeholder="Add Lead Email"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="phone_number" className="w-1/3 font-medium">
            Phone Number
          </label>
          <div className="w-2/3">
            <input
              id="phone_number"
              type="text"
              placeholder="Add Phone Number"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>

        {/* Company Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="company" className="w-1/3 font-medium">
            Company
          </label>
          <div className="w-2/3">
            <input
              id="company"
              type="text"
              placeholder="Enter Company Name"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>
        </div>

        {/* Location Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="location" className="w-1/3 font-medium">
            Location
          </label>
          <div className="w-2/3">
            <input
              id="location"
              type="text"
              placeholder="Enter Location"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Designation Name Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="designation" className="w-1/3 font-medium">
            Designation
          </label>
          <div className="w-2/3">
            <input
              id="designation"
              type="text"
              placeholder="Enter Designation Name"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("designation")}
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">
                {errors.designation.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="w-full lg:w-1/2 self-end flex gap-4 my-4 justify-end">
          <Button
            type="reset"
            text="Cancel"
            variant="alt"
            onClick={() => navigate(-1)}
          />
          <Button
            text={isEditing ? "Save Update" : "Add Lead"}
            variant="main"
            type="submit"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
