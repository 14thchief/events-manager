"use client";
import Table from "../../../components/Table";
import {
  useDeleteCouponMutation,
  useEditCouponMutation,
  useGetCouponsQuery,
} from "../../../redux/features/cms/couponSlice";
import TableDropdownActions from "../../../components/Table/TableDropdownActions";
import { Trash } from "../../../assets/icons/icons";
import { mS } from "../../../constants";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utilities/formatCurrency";
import PageLayout from "../../../components/PageLayout";
import { Coupon } from "../../../redux/features/cms/types/couponType";
import { TableColumn } from "../../../components/Table/types";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";
import SwitchToggle from "../../../components/SwitchToggle";
import CreateButton from "../../../components/CreateButton";
import Modal from "../../../components/Modal";
import FileUploadCard from "../../../components/FileUpload";
import { useBulkUploadMutation } from "../../../redux/features/cms/bulkUploadSlice";
import { toast } from "react-toastify";

const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: coupons, isLoading: isCouponsLoading } = useGetCouponsQuery();
  const memoizedCoupons = useMemo(() => coupons, [coupons]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [deleteCoupon] = useDeleteCouponMutation();
  const handleDelete = (id: number) => {
    dispatch(
      openActionModal({
        title: "Confirm Delete Coupon",
        isOpen: true,
        type: "warning",
        content: `Are you sure you want to Delete this coupon?`,
        callback: () => {
          deleteCoupon(id)
            .unwrap()
            .then(() => {
              dispatch(
                openActionModal({
                  isOpen: true,
                  type: "success",
                  title: "Coupon Deleted",
                  content: <p>Coupon successfully deleted!</p>,
                  callback: () => navigate("/cms/discount"),
                  callbackText: "Close",
                })
              );
            })
            .catch((error) => console.error(error));
        },
        callbackText: "Delete",
        cancelText: "Cancel",
      })
    );
  };

  const [bulkUpload, { isLoading }] = useBulkUploadMutation();
  const handleBulkUpload = (data: any[]) => {
    bulkUpload({ endpoint: "bulkCoupons", formData: data })
      .unwrap()
      .then((res) => {
        setShowModal(false);
        toast.success("Coupons successfully uploaded!");
      })
      .catch((err) => console.error({ err }));
  };

  // Bulk Upload template data
  const templateData = [
    {
      name: "Linda Bekoe",
      designation: "CEO",
      company: "APLBC",
      location: "United Kingdom",
      email: "linda@aplbc.com",
      phone_number: "+6090909090",
      events: "[4,5,3]",
    },
    {
      name: "Edwin Bekoe",
      designation: "COO",
      company: "APLBC",
      location: "United Kingdom",
      email: "edwin@aplbc.com",
      phone_number: "+6090909091",
      events: "[1,2,3]",
    },
  ];

  // Header schema with aliases and required fields
  const headerSchema = {
    name: {
      required: true, // user must provide this column
      aliases: ["Full Name"], // allow "Full Name" to match "name"
    },
    designation: {
      required: false,
      aliases: ["role", "job title"],
    },
    company: {
      required: false,
      aliases: ["organization", "company name"],
    },
    location: {
      required: false,
      aliases: ["city", "address"],
    },
    email: {
      required: true,
      aliases: ["email address", "e-mail"],
    },
    phone_number: {
      required: true,
      aliases: ["phone", "phone number", "PhoneNumber"],
    },
    events: {
      required: false,
      aliases: ["tags", "array"],
    },
  };

  const [editCoupon] = useEditCouponMutation();
  const handleToggleCouponStatus = (
    id: Coupon["id"],
    status: Coupon["status"]
  ) => {
    editCoupon({ id, status })
      .unwrap()
      .catch((err) => console.error(err));
  };

  const columns: TableColumn<Coupon>[] = [
    {
      header: "Coupon Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Code",
      accessorKey: "code",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Value",
      accessorKey: "value",
      enableSorting: true,
      cell: ({ getValue, row }) => {
        return getValue() && row.original.type != "percentage" ? (
          formatCurrency((getValue() as number) / 100, "GBP")
        ) : getValue() ? (
          `${getValue()}%`
        ) : (
          <p style={{ color: "lightgray" }}>{"N/A"}</p>
        );
      },
    },
    {
      header: "Max Amount",
      accessorKey: "max_value",
      enableSorting: true,
      cell: ({ getValue }) => {
        return (
          formatCurrency((getValue() as number) / 100, "GBP") ?? (
            <p style={{ color: "lightgray" }}>{"N/A"}</p>
          )
        );
      },
    },
    {
      header: "Coupon Type",
      accessorKey: "type",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Expiry Date",
      accessorKey: "expires_at",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="uppercase text-[15px] min-w-max">
            {item.expires_at ? (
              <span>
                {mS[new Date(item.expires_at * 1000).getMonth()]}{" "}
                {new Date(item.expires_at * 1000).getDate()}
              </span>
            ) : (
              <p>No Expiry Date</p>
            )}
          </p>
        );
      },
      enableSorting: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue, row }) => {
        const status = getValue() as Coupon["status"] | undefined;
        const newStatus = status === "active" ? "inactive" : "active";
        const checked = (getValue() as Coupon["status"]) === "active";
        return (
          <SwitchToggle
            checked={checked}
            slotProps={{ input: { "aria-label": "controlled" } }}
            onChange={() =>
              handleToggleCouponStatus(row.original.id, newStatus)
            }
          />
        );
      },
      enableSorting: true,
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <TableDropdownActions
            actions={[
              {
                label: "Deactivate",
                icon: <Trash size={18} />,
                customComponent: (
                  <p
                    onClick={() => handleDelete(row.original.id as number)}
                    className="cursor-pointer hover:bg-primary transition transition-bg flex items-center gap-2 p-2 text-red-600"
                  >
                    <Trash size={18} />
                    Delete
                  </p>
                ),
              },
            ]}
          />
        </div>
      ),
      enableSorting: false,
    },
  ];

  return (
    <PageLayout
      title="Coupons"
      actions={[
        <CreateButton
          label="Add Coupons"
          onSingleCreate={() => navigate("/cms/discount/create")}
          onBulkCreate={() => setShowModal(true)}
        />,
      ]}
    >
      <Table
        headerTitle={
          selectedCoupons?.length
            ? `${selectedCoupons?.length} Coupon(s) Selected`
            : ""
        }
        data={memoizedCoupons ?? []}
        columns={columns}
        selectable={true}
        onSelectionChange={setSelectedCoupons}
        useHeader={false}
        loading={isCouponsLoading}
        tableProps={{
          isPaginated: "local",
        }}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <FileUploadCard
          onSubmit={(data) => handleBulkUpload(data)}
          title="Coupons"
          templateData={templateData}
          headerSchema={headerSchema}
          isLoading={isLoading}
        />
      </Modal>
    </PageLayout>
  );
};

export default Coupons;
