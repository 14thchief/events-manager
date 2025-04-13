import React, { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

interface CreateButtonProps {
  onSingleCreate: () => void;
  onBulkCreate: () => void;
  label?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  onSingleCreate,
  onBulkCreate,
  label = "Create",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded transition"
      >
        {label}
        <BiChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white rounded shadow-md ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => {
              setOpen(false);
              onSingleCreate();
            }}
            className="bg-transparent block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Single Create
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onBulkCreate();
            }}
            className="bg-transparent block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Bulk Create
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateButton;
