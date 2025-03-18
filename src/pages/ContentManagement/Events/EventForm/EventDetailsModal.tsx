import React, { useState, useEffect, useMemo } from "react";
import Modal from "../../../../components/Modal";
import { BiX } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../../../components/Button";
import { detailKeys } from "."; // ensure detailKeys is exported from the proper file

export interface Detail {
  type: string;
  value: string;
}

interface EventDetailsModalProps {
  isOpen: boolean;
  details: Detail[];
  onSave: (details: Detail[]) => void;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  details = [],
  onSave,
  onClose,
}) => {
  const [localDetails, setLocalDetails] = useState<Detail[]>(details);
  const [newDetailType, setNewDetailType] = useState<string>("");
  const [newDetailValue, setNewDetailValue] = useState<string>("");

  // Memoize filtered detail types so that any key already in localDetails is removed
  const filteredDetailTypes = useMemo(
    () =>
      detailKeys.filter(
        (deets) =>
          !localDetails.some(
            (detail) => detail.type.toLowerCase() === deets.toLowerCase()
          )
      ),
    [localDetails]
  );

  // Sync local state when modal opens or details prop changes
  useEffect(() => {
    if (isOpen) {
      // setLocalDetails(details);
      setNewDetailType("");
      setNewDetailValue("");
    }
  }, [details, isOpen]);

  const handleAddDetail = () => {
    if (newDetailType && newDetailValue) {
      setLocalDetails((prev) => [
        ...prev,
        { type: newDetailType, value: newDetailValue },
      ]);
      setNewDetailType("");
      setNewDetailValue("");
    }
  };

  const handleDeleteDetail = (index: number) => {
    setLocalDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditDetail = (
    index: number,
    field: "type" | "value",
    newValue: string
  ) => {
    setLocalDetails((prev) =>
      prev.map((detail, i) =>
        i === index ? { ...detail, [field]: newValue } : detail
      )
    );
  };

  const handleSave = () => {
    onSave(localDetails);
    onClose();
  };

  console.log({ localDetails });
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 bg-transparent rounded-lg min-w-[90vw] md:min-w-[60vw] lg:min-w-[40vw] p-6">
        <h2 className="text-xl font-bold mb-4">Event Details</h2>

        {/* List of current details */}
        {localDetails.length > 0 ? (
          <ul className="space-y-4 mb-4">
            {localDetails.map((detail, index) => (
              <li key={index} className="flex flex-col gap-2 py-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-bold capitalize">
                    {detail.type.split("_").join(" ")}
                  </span>
                  <button
                    onClick={() => handleDeleteDetail(index)}
                    className="bg-transparent p-0 rounded-full h-6 w-6"
                  >
                    <BiX size={24} />
                  </button>
                </div>
                <ReactQuill
                  theme="snow"
                  value={detail.value}
                  onChange={(value) => handleEditDetail(index, "value", value)}
                  className="border rounded"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-4">No details added yet.</p>
        )}

        {/* New detail inputs */}
        <div className="flex flex-col gap-2 mb-4">
          <h4 className="font-bold text-primary-color">Add New Detail</h4>
          <select
            value={newDetailType}
            onChange={(e) => setNewDetailType(e.target.value)}
            className="border rounded p-2 flex-1 capitalize"
          >
            <option value="">Select detail type</option>
            {filteredDetailTypes.map((option, i) => (
              <option key={i} value={option}>
                {option
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
          <ReactQuill
            theme="snow"
            value={newDetailValue}
            onChange={setNewDetailValue}
            placeholder="Enter detail"
            className="flex-1 mb-4"
          />
          <Button
            variant="alt"
            size="small"
            width="fit"
            text="Add Detail"
            onClick={handleAddDetail}
          />
        </div>

        {/* Modal actions */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-primary text-white px-3 py-1 rounded"
          >
            Save Details
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
