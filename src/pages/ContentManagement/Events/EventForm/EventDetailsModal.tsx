import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Modal";
import { BiX } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  details,
  onSave,
  onClose,
}) => {
  // Local state to edit details within the modal
  const [localDetails, setLocalDetails] = useState<Detail[]>(details);
  const [newDetailType, setNewDetailType] = useState<string>("");
  const [newDetailValue, setNewDetailValue] = useState<string>("");

  // Define all available detail types
  const allDetailTypes = ["Location", "Speaker", "Agenda"];

  // Filter out types that have already been added
  const filteredDetailTypes = allDetailTypes.filter(
    (type) => !localDetails.some((detail) => detail.type === type)
  );

  // Sync local state when the modal opens or when parent details change
  useEffect(() => {
    if (isOpen) {
      setLocalDetails(details);
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

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 bg-transparent rounded-lg min-w-[90vw] md:min-w-[60vw] lg:min-w-[40vw] p-6">
        <h2 className="text-xl font-bold mb-4">Event Details</h2>

        {/* List of current details */}
        {localDetails.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {localDetails.map((detail, index) => (
              <li key={index} className="flex flex-col gap-2 py-2">
                <div className="w-full flex items-center justify-between px-1">
                  <span className="font-bold">{detail.type}</span>
                  <button
                    onClick={() => handleDeleteDetail(index)}
                    className="bg-transparent self-end p-0 rounded-full h-6 w-6"
                  >
                    <BiX size={24} />
                  </button>
                </div>
                <input
                  type="text"
                  value={detail.type}
                  onChange={(e) =>
                    handleEditDetail(index, "type", e.target.value)
                  }
                  placeholder="Detail Type"
                  className="border rounded p-2 flex-1"
                />
                <ReactQuill
                  theme="snow"
                  value={detail.value}
                  onChange={(value) => handleEditDetail(index, "value", value)}
                  className="flex-1"
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
            className="border rounded p-2 flex-1"
          >
            <option value="">Select detail type</option>
            {filteredDetailTypes.map((option) => (
              <option key={option} value={option}>
                {option}
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
          <button
            onClick={handleAddDetail}
            className="bg-primary text-black px-2 py-1 rounded"
          >
            Add Detail
          </button>
        </div>

        {/* Modal actions */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded"
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
