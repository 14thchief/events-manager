"use client";
import Table from "../../../components/Table";
import {
  useDeleteCouponMutation,
  useEditCouponMutation,
  useGetCouponsQuery,
} from "../../../redux/features/cms/couponSlice";
import TableDropdownActions from "../../../components/Table/TableDropdownActions";
import StatusBadge from "../../../components/StatusBadge";
import { Add, Edit, Eye, Trash } from "../../../assets/icons/icons";
import { mS } from "../../../constants";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utilities/formatCurrency";
import PageLayout from "../../../components/PageLayout";
import { ColumnDef } from "@tanstack/react-table";
import Button from "../../../components/Button";
import { Coupon } from "../../../redux/features/cms/types/couponType";
import { TableColumn } from "../../../components/Table/types";
import { Status } from "../../../components/StatusBadge/types";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";
import { ToggleButton } from "@mui/material";

const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: coupons, isLoading: isCouponsLoading } = useGetCouponsQuery();
  const memoizedCoupons = useMemo(() => coupons, [coupons]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

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
                  callback: () => navigate("/cms/coupons"),
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

  const [editCoupon] = useEditCouponMutation();
  const handleToggleCouponStatus = (
    id: Coupon["id"],
    status: Coupon["status"]
  ) => {
    console.log({ id, status });
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
        return (
          <ToggleButton
            value={true}
            defaultChecked={false}
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
                label: "Edit",
                icon: <Edit size={16} />,
                customComponent: (
                  <p
                    onClick={() => {
                      navigate(`/cms/coupons/edit`, {
                        state: {
                          coupon: row.original,
                        },
                      });
                    }}
                    className="cursor-pointer hover:bg-gray-50 transition transition-bg flex items-center gap-2 p-2"
                  >
                    <Edit size={16} />
                    Edit
                  </p>
                ),
              },
              {
                label: "Deactivate",
                icon: <Trash size={18} />,
                customComponent: (
                  <p
                    onClick={() => handleDelete(row.original.id as number)}
                    className="cursor-pointer hover:bg-gray-50 transition transition-bg flex items-center gap-2 p-2 text-red-600"
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
        <Button
          onClick={() => navigate("/cms/coupons/create")}
          key={"add_coupon"}
          text="Add coupon"
          icon={<Add />}
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
    </PageLayout>
  );
};

export default Coupons;
