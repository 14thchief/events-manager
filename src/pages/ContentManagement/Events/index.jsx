import Table from "../../../components/Table";
import { useGetEventsQuery } from "../../../redux/features/cms/eventSlice";
import TableDropdownActions from "../../../components/Table/TableDropdownActions";
import StatusBadge from "../../../components/StatusBadge";
import { Add, Edit, Eye, Trash } from "../../../assets/icons/icons";
import { mS } from "../../../constants";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utilities/formatCurrency";
import PageLayout from "../../../components/PageLayout";
import Button from "../../../components/Button";

const Events = () => {
  const navigate = useNavigate();
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery();
  const memoizedEvents = useMemo(() => events, [events]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const columns = [
    {
      header: "Event Name",
      accessorKey: "event",
      cell: ({ getValue }) => (
        <div
          onClick={() => {
            // dispatch(highlightEvent(row.original));
            navigate(`/cms/events/${getValue()}`);
          }}
        >
          <p className={``}>{getValue()}</p>
        </div>
      ),
      enableSorting: false,
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
      cell: ({ getValue }) => (
        <StatusBadge textOnly status={getValue()?.toLowerCase() || "inactive"}>
          {getValue() || "Inactive"}
        </StatusBadge>
      ),
      enableSorting: false,
    },
    {
      header: "Cost",
      accessorKey: "hotel_cost",
      enableSorting: false,
      cell: ({ getValue }) => {
        return (
          formatCurrency(getValue() / 100, "GBP") ?? (
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
                label: "View",
                icon: <Eye size={18} />,
                customComponent: (
                  <p className="flex items-center gap-2 p-2">
                    <Eye size={18} />
                    View
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
              {
                label: "Edit",
                icon: <Edit size={16} />,
                customComponent: (
                  <p className="flex items-center gap-2 p-2">
                    <Edit size={16} />
                    Edit
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
              {
                label: "Deactivate",
                icon: <Trash size={18} />,
                customComponent: (
                  <p className="flex items-center gap-2 p-2 text-red-600">
                    <Trash size={18} />
                    Deactivate
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
      actions={[<Button key={"add_event"} text="Add event" icon={<Add />} />]}
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
