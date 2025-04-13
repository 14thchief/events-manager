"use client";
import Table from "../../../components/Table";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../../../redux/features/cms/contactSlice";
import TableDropdownActions from "../../../components/Table/TableDropdownActions";
import StatusBadge from "../../../components/StatusBadge";
import { Add, Edit, Eye, Trash } from "../../../assets/icons/icons";
import { mS, regions } from "../../../constants";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utilities/formatCurrency";
import PageLayout from "../../../components/PageLayout";
import { ColumnDef } from "@tanstack/react-table";
import Button from "../../../components/Button";
import { Contact } from "../../../redux/features/cms/types/contactType";
import { TableColumn } from "../../../components/Table/types";
import { Status } from "../../../components/StatusBadge/types";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";
import { BiTagAlt } from "react-icons/bi";
import SideDrawer from "../../../components/Drawer";
import TagLeadModal from "../Leads/TagLead";
import CreateButton from "../../../components/CreateButton";
import Modal from "../../../components/Modal";
import FileUploadCard from "../../../components/FileUpload";
import { useBulkUploadMutation } from "../../../redux/features/cms/bulkUploadSlice";
import { toast } from "react-toastify";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: contacts, isLoading: isContactsLoading } =
    useGetContactsQuery();
  const memoizedContacts = useMemo(() => contacts, [contacts]);
  const [showModal, setShowModal] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = memoizedContacts?.filter(
    (contact) =>
      contact.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      contact.billing_entity_name
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      contact.billing_address
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      contact.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      contact.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      contact.phone_number?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const [deleteContact] = useDeleteContactMutation();
  const handleDelete = (id: number) => {
    dispatch(
      openActionModal({
        title: "Confirm Delete Contact",
        isOpen: true,
        type: "warning",
        content: `Are you sure you want to Delete this contact?`,
        callback: () => {
          deleteContact(id)
            .unwrap()
            .then(() => {
              dispatch(
                openActionModal({
                  isOpen: true,
                  type: "success",
                  title: "Contact Deleted",
                  content: <p>Contact successfully deleted!</p>,
                  callback: () => navigate("/cms/contacts"),
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
    bulkUpload({ endpoint: "bulkContacts", formData: data })
      .unwrap()
      .then((res) => {
        setShowModal(false);
        toast.success("Contacts successfully uploaded!");
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

  const columns: TableColumn<Contact>[] = [
    {
      header: "Contact Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableSorting: true,
    },
    {
      header: "Company",
      accessorKey: "company",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Billing Address",
      accessorKey: "billing_address",
      enableSorting: true,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Billing Entity Name",
      accessorKey: "billing_entity_name",
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
        return (
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
                      navigate(`/cms/contacts/edit`, {
                        state: {
                          contact: row.original,
                        },
                      });
                    }}
                    className="cursor-pointer flex items-center gap-2 p-2"
                  >
                    <Edit size={16} />
                    Edit
                  </p>
                ),
              },
              {
                label: "Tag Contacts",
                icon: <BiTagAlt size={16} />,
                customComponent: (
                  <p
                    onClick={() => {
                      setShowDrawer(true);
                    }}
                    className="cursor-pointer flex items-center gap-2 p-2"
                  >
                    <BiTagAlt size={16} />
                    Tag Contacts
                  </p>
                ),
              },
              // {
              //   label: "Deactivate",
              //   icon: <Trash size={18} />,
              //   customComponent: (
              //     <p
              //       onClick={() => handleDelete(row.original.id as number)}
              //       className="cursor-pointer flex items-center gap-2 p-2 text-red-600"
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
      title="Contacts"
      actions={[
        <CreateButton
          label="Add Contacts"
          onSingleCreate={() => navigate("/cms/contacts/create")}
          onBulkCreate={() => setShowModal(true)}
        />,
      ]}
    >
      <div className="flex gap-4 my-2 items-center justify-start">
        <input
          type="text"
          name="contact"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          placeholder="Search Contacts Name"
          className="border p-2 rounded-lg w-[300px] font-normal focus:outline-primary"
        />
      </div>
      <Table
        headerTitle={
          selectedContacts?.length
            ? `${selectedContacts?.length} Contact(s) Selected`
            : ""
        }
        data={filteredContacts ?? []}
        columns={columns}
        selectable={true}
        onSelectionChange={setSelectedContacts}
        useHeader={false}
        loading={isContactsLoading}
        tableProps={{
          isPaginated: "local",
        }}
      />

      <SideDrawer
        isOpen={showDrawer}
        closeDrawer={() => setShowDrawer(false)}
        children={<TagLeadModal closeDrawer={() => setShowDrawer(false)} />}
      />

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <FileUploadCard
          onSubmit={(data) => handleBulkUpload(data)}
          title="Contacts"
          templateData={templateData}
          headerSchema={headerSchema}
          isLoading={isLoading}
        />
      </Modal>
    </PageLayout>
  );
};

export default Contacts;
