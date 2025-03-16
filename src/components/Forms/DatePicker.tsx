import React from "react";

interface DatePickerProps {
  label: string;
  name: string;
  timestamp: number;
  onChange: (name: string, timestamp: number) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  timestamp,
  onChange,
  className,
}) => {
  // Convert Unix timestamp to "YYYY-MM-DD"
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toISOString().split("T")[0];
  };

  // Convert "YYYY-MM-DD" back to Unix timestamp (seconds)
  const toUnixTimestamp = (dateString: string): number => {
    return Math.floor(new Date(dateString).getTime() / 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimestamp = toUnixTimestamp(e.target.value);
    onChange(name, newTimestamp);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-semibold">{label}</label>
      <input
        type="date"
        name={name}
        value={formatDate(timestamp)}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full"
        required
      />
    </div>
  );
};

export default DatePicker;
