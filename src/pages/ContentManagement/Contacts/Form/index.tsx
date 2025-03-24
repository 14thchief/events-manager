import { useLocation, useNavigate, Link } from "react-router";
import { BiLeftArrow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import {
  useCreateContactMutation,
  useEditContactMutation,
} from "../../../../redux/features/cms/contactSlice";
import { openActionModal } from "../../../../redux/features/util/actionModalSlice";
import { Contact } from "../../../../redux/features/cms/types/contactType";

// Create a form-specific type by omitting the fields not in the form (e.g. "id")
type ContactFormValues = Omit<Contact, "id">;

// Validation schema using Yup
const contactSchema = yup.object().shape({
  name: yup.string().required("Contact name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  company: yup.string().required("Company name is required"),
  billing_address: yup.string().required("Billing address is required"),
  billing_entity_name: yup.string().required("Billing entity name is required"),
});

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isEditing = Boolean(state?.contact);

  // Prepare default values ensuring "id" is omitted
  const defaultValues: ContactFormValues = isEditing
    ? {
        name: state.contact.name,
        email: state.contact.email,
        phone_number: state.contact.phone_number,
        company: state.contact.company,
        billing_address: state.contact.billing_address,
        billing_entity_name: state.contact.billing_entity_name,
      }
    : {
        name: "",
        email: "",
        phone_number: "",
        company: "",
        billing_address: "",
        billing_entity_name: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues,
  });

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useEditContactMutation();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      if (isEditing) {
        // Prepare update data including the id
        const updatedData: Record<string, any> = { id: state.contact.id };
        Object.entries(state.contact).forEach(([key, val]) => {
          if (key !== "id" && data[key as keyof ContactFormValues] !== val) {
            updatedData[key] = data[key as keyof ContactFormValues];
          }
        });

        await updateContact(updatedData).unwrap();
      } else {
        await createContact(data).unwrap();
      }

      dispatch(
        openActionModal({
          isOpen: true,
          type: "success",
          title: isEditing
            ? "Contact Updated Successfully"
            : "Contact Created Successfully",
          content: (
            <p>Contact successfully {isEditing ? "updated" : "created"}!</p>
          ),
          callback: () => navigate("/cms/contacts"),
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
          to="/cms/contacts"
          className="flex items-center gap-2 text-gray-700 hover:text-yellow-600"
        >
          <BiLeftArrow /> Back
        </Link>
        <button
          type="button"
          onClick={() => navigate("/cms/contacts")}
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <h1 className="text-2xl font-bold">
        {isEditing ? "Edit Contact" : "Add Contact"}
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
              placeholder="Add Contact Name"
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
              placeholder="Add Contact Email"
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

        {/* Billing Address Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="billing_address" className="w-1/3 font-medium">
            Billing Address
          </label>
          <div className="w-2/3">
            <input
              id="billing_address"
              type="text"
              placeholder="Enter Billing Address"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("billing_address")}
            />
            {errors.billing_address && (
              <p className="text-red-500 text-sm">
                {errors.billing_address.message}
              </p>
            )}
          </div>
        </div>

        {/* Billing Entity Name Field */}
        <div className="flex items-center gap-4">
          <label htmlFor="billing_entity_name" className="w-1/3 font-medium">
            Billing Entity
          </label>
          <div className="w-2/3">
            <input
              id="billing_entity_name"
              type="text"
              placeholder="Enter Billing Entity Name"
              className="border p-2 rounded-lg w-full focus:outline-primary"
              {...register("billing_entity_name")}
            />
            {errors.billing_entity_name && (
              <p className="text-red-500 text-sm">
                {errors.billing_entity_name.message}
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
            text={isEditing ? "Save Update" : "Add Contact"}
            variant="main"
            type="submit"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
