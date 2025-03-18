"use client";
import Table from "../../../components/Table";
import { useDeleteEventMutation, useGetEventsQuery } from "../../../redux/features/cms/eventSlice";
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
import { Event } from "../../../redux/features/cms/types/eventType";
import { TableColumn } from "../../../components/Table/types";
import { Status } from "../../../components/StatusBadge/types";
import { useDispatch } from "react-redux";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery();
  const memoizedEvents = useMemo(() => events, [events]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const [deleteEvent] = useDeleteEventMutation();
  const handleDelete = (id: number) => {
    // dispatch(openActionModal({

    // }))

    
  }

  const columns: TableColumn<Event>[] = [
    {
      header: "Event Name",
      accessorKey: "event",
      cell: ({ row, getValue }) => (
        <div
          onClick={() => {
            // dispatch(highlightEvent(row.original));
            navigate(`/cms/events/${getValue()}`, {
              state: {
                event: row.original,
              },
            });
          }}
        >
          <p className={`cursor-pointer text-[#483e1f] hover:underline`}>
            {getValue() as Event["event"]}
          </p>
        </div>
      ),
      enableSorting: true,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="uppercase text-[15px] min-w-max">
            {item.start_date ? (
              <span>
                {mS[new Date(item.start_date * 1000).getMonth()]}{" "}
                {new Date(item.start_date * 1000).getDate()}
              </span>
            ) : (
              "TBA"
            )}
            {item.end_date !== item.start_date && (
              <span>
                <span className="mx-[4px] min-w-max">-</span>
                {new Date(item.end_date * 1000).getDate()}{" "}
                {mS[new Date(item.end_date * 1000).getMonth()]}
              </span>
            )}
          </p>
        );
      },
      enableSorting: false,
    },
    {
      header: "Location",
      accessorKey: "city",
      enableSorting: false,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Event Segment",
      accessorKey: "segment",
      enableSorting: false,
      cell: ({ getValue }) => {
        return getValue() ?? <p style={{ color: "lightgray" }}>{"N/A"}</p>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as string | undefined;
        return (
          <StatusBadge
            textOnly={true}
            status={(status?.toLowerCase() as Status) || "active"}
          >
            {(getValue() as string) || "Active"}
          </StatusBadge>
        );
      },
      enableSorting: false,
    },
    {
      header: "Cost",
      accessorKey: "hotel_cost",
      enableSorting: false,
      cell: ({ getValue }) => {
        return (
          formatCurrency((getValue() as number) / 100, "GBP") ?? (
            <p style={{ color: "lightgray" }}>{"N/A"}</p>
          )
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <TableDropdownActions
            actions={[
              {
                customComponent: (
                  <p
                    onClick={() => {
                      navigate(`/cms/events/${row.original.event}`, {
                        state: {
                          event: row.original,
                        },
                      });
                    }}
                    className="cursor-pointer hover:bg-gray-50 transition transition-bg flex items-center gap-2 p-2"
                  >
                    <Eye size={18} />
                    View
                  </p>
                ),
              },
              {
                label: "Edit",
                icon: <Edit size={16} />,
                customComponent: (
                  <p
                    onClick={() => {
                      navigate(`/cms/events/edit`, {
                        state: {
                          event: row.original,
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
                  <p onClick={()=> handleDelete(row.original.id)} className="cursor-pointer hover:bg-gray-50 transition transition-bg flex items-center gap-2 p-2 text-red-600">
                    <Trash size={18} />
                    Delete
                  </p>
                ),
                onClick: () => {
                  navigate(`/cms/events/${row.original.event}`, {
                    state: {
                      event: row.original,
                    },
                  });
                },
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
      title="Events"
      actions={[
        <Button
          onClick={() => navigate("/cms/events/create")}
          key={"add_event"}
          text="Add event"
          icon={<Add />}
        />,
      ]}
    >
      <Table
        headerTitle={
          selectedEvents?.length
            ? `${selectedEvents?.length} Event(s) Selected`
            : ""
        }
        data={memoizedEvents ?? []}
        columns={columns}
        selectable={true}
        onSelectionChange={setSelectedEvents}
        useHeader={false}
        loading={isEventsLoading}
        tableProps={{
          isPaginated: "local",
        }}
      />
    </PageLayout>
  );
};

export default Events;
