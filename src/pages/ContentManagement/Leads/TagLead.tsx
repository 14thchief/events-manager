import React, { useEffect, useMemo, useState } from "react";
import { BiX } from "react-icons/bi";
import { useGetLeadsQuery } from "../../../redux/features/cms/leadSlice";
import { Lead } from "../../../redux/features/cms/types/leadType";

// interface Lead {
//   id: number;
//   name: string;
//   role: string;
//   company: string;
//   checked: boolean;
// }

const TagLeadModal: React.FC<{ closeDrawer: () => void }> = ({
  closeDrawer,
}) => {
  const { data, isLoading: isLeadsLoading } = useGetLeadsQuery();
  const memoizedLeads = useMemo(
    () =>
      data?.map((x: Lead) => ({
        ...x,
        checked: false,
      })),
    [data]
  );

  const [leads, setLeads] = useState(memoizedLeads);
  useEffect(() => {
    setLeads(memoizedLeads);
  }, [memoizedLeads]);

  const selectedLeads = leads?.filter((lead) => lead.checked);

  const toggleLead = (id: number) => {
    setLeads((prev) =>
      prev?.map((lead) =>
        lead.id === id ? { ...lead, checked: !lead.checked } : lead
      )
    );
  };

  return (
    <div className="bg-white w-[372px] max-w-full h-full shadow-xl rounded-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h2 className="text-lg font-medium">
          Tag Leads {!!selectedLeads?.length && `(${selectedLeads.length})`}
        </h2>
        <button className="bg-transparent" onClick={() => closeDrawer()}>
          <BiX className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Lead List */}
      <div className="flex-1 overflow-y-auto pr-2">
        {leads?.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between py-2 border-b border-transparent hover:border-gray-100"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4"
                checked={lead.checked}
                onChange={() => toggleLead(lead.id)}
              />
              <div>
                <p className="text-sm font-medium">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.designation}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">{lead.company}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4">
        <button className="bg-primary text-white py-2 w-full rounded hover:bg-yellow-800 transition">
          Tag Lead
        </button>
      </div>
    </div>
  );
};

export default TagLeadModal;
