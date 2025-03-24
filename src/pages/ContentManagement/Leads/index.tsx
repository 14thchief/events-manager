"use client";
import Table from "../../../components/Table";
import {
  useDeleteLeadMutation,
  useGetLeadsQuery,
} from "../../../redux/features/cms/leadSlice";
import TableDropdownActions from "../../../components/Table/TableDropdownActions";
import { Add, Edit, Eye, Trash } from "../../../assets/icons/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import PageLayout from "../../../components/PageLayout";
import Button from "../../../components/Button";
import { Lead } from "../../../redux/features/cms/types/leadType";
import { TableColumn } from "../../../components/Table/types";
import { useDispatch } from "react-redux";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: leads, isLoading: isLeadsLoading } = useGetLeadsQuery();
  const memoizedLeads = useMemo(() => leads, [leads]);

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = memoizedLeads?.filter(
    (lead) =>
      lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      lead.designation?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      lead.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      lead.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      lead.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      lead.phone_number?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  // const [deleteLead] = useDeleteLeadMutation();
  // const handleDelete = (id: number) => {
  //   dispatch(
  //     openActionModal({
  //       title: "Confirm Delete Lead",
  //       isOpen: true,
  //       type: "warning",
  //       content: `Are you sure you want to Delete this lead?`,
  //       callback: () => {
  //         deleteLead(id)
  //           .unwrap()
  //           .then(() => {
  //             dispatch(
  //               openActionModal({
  //                 isOpen: true,
  //                 type: "success",
  //                 title: "Lead Deleted",
  //                 content: <p>Lead successfully deleted!</p>,
  //                 callback: () => navigate("/cms/leads"),
  //                 callbackText: "Close",
  //               })
  //             );
  //           })
  //           .catch((error) => console.error(error));
  //       },
  //       callbackText: "Delete",
  //       cancelText: "Cancel",
  //     })
  //   );
  // };

  const columns: TableColumn<Lead>[] = [
    {
      header: "Company",
      accessorKey: "company",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Location",
      accessorKey: "location",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Lead Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableSorting: true,
    },
    {
      header: "Designation",
      accessorKey: "designation",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Create Date",
      accessorKey: "created_at",
      cell: ({ row, getValue }) => {
        const item = row.original;
        return getValue() ? (
          <p className="text-[15px] min-w-max">
            {new Date((getValue() as number) * 1000).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </p>
        ) : (
          <p style={{ color: "lightgray" }}>{"N/A"}</p>
        );
      },
      enableSorting: true,
    },
    {
      header: "Update Date",
      accessorKey: "updated_at",
      cell: ({ row, getValue }) => {
        const item = row.original;
        return getValue() ? (
          <p className="text-[15px] min-w-max">
            {new Date((getValue() as number) * 1000).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </p>
        ) : (
          <p style={{ color: "lightgray" }}>{"N/A"}</p>
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
                      navigate(`/cms/leads/edit`, {
                        state: {
                          lead: row.original,
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
              // {
              //   label: "Deactivate",
              //   icon: <Trash size={18} />,
              //   customComponent: (
              //     <p
              //       onClick={() => handleDelete(row.original.id as number)}
              //       className="cursor-pointer hover:bg-gray-50 transition transition-bg flex items-center gap-2 p-2 text-red-600"
              //     >
              //       <Trash size={18} />
              //       Delete
              //     </p>
              //   ),
              // },
            ]}
          />
        </div>
      ),
      enableSorting: false,
    },
  ];

  return (
    <PageLayout
      title="Leads"
      actions={[
        <Button
          onClick={() => navigate("/cms/leads/create")}
          key={"add_lead"}
          text="Add lead"
          icon={<Add />}
        />,
      ]}
    >
      <div className="flex gap-4 my-2 items-center justify-start">
        <input
          type="text"
          name="lead"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          placeholder="Search Leads Name"
          className="border p-2 rounded-lg w-[300px] font-normal focus:outline-primary"
        />
      </div>
      <Table
        headerTitle={
          selectedLeads?.length
            ? `${selectedLeads?.length} Lead(s) Selected`
            : ""
        }
        data={filteredLeads ?? []}
        columns={columns}
        selectable={true}
        onSelectionChange={setSelectedLeads}
        useHeader={false}
        loading={isLeadsLoading}
        tableProps={{
          isPaginated: "local",
        }}
      />
    </PageLayout>
  );
};

export default Leads;
