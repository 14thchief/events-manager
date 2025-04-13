import React, { useRef, useState } from "react";
import { BiFile } from "react-icons/bi";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Button from "../Button";

// --- Types ---
type DataRow = Record<string, any>;

interface HeaderSchema {
  [header: string]: {
    required?: boolean;
    aliases?: string[];
  };
}

interface FileUploadCardProps {
  onSubmit: (data: DataRow[]) => void;
  title?: string;
  templateData?: DataRow[];
  headerSchema?: HeaderSchema;
  isLoading?: boolean;
}

// --- Component ---
const FileUploadCard: React.FC<FileUploadCardProps> = ({
  onSubmit,
  title,
  templateData,
  headerSchema,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [parsedData, setParsedData] = useState<DataRow[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  // --- File Upload Handlers ---
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    // Clear previous validation error and parsed data
    setValidationError(null);
    setParsedData([]);
    parseFile(droppedFiles[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles([file]);
      setValidationError(null);
      setParsedData([]);
      parseFile(file);
    }
  };

  // --- Parse Files ---
  const parseFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) =>
          handleParseComplete(
            results.data as DataRow[],
            results.meta.fields as string[]
          ),
        error: (error) => toast.error(`CSV parsing error: ${error.message}`),
      });
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, {
            defval: "",
          }) as DataRow[];
          // Get headers from the first row keys:
          const headers = json.length > 0 ? Object.keys(json[0]) : [];
          handleParseComplete(json, headers);
        } catch {
          toast.error("Error parsing Excel file.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Unsupported file type. Only .csv and .xlsx are allowed.");
    }
  };

  // --- Handle Parsed Data ---
  const handleParseComplete = (data: DataRow[], headers?: string[]) => {
    // Validate headers if a schema was provided
    if (headerSchema && headers) {
      const validation = validateHeaders(headers, headerSchema);
      if (!validation.valid) {
        setValidationError(validation.message);
        return;
      }
    }

    // Clear any previous validation errors if headers are valid
    setValidationError(null);

    // Convert stringified arrays into arrays
    const processedData = data.map((row) => {
      const newRow = { ...row };
      Object.keys(newRow).forEach((key) => {
        const value = newRow[key];
        if (
          typeof value === "string" &&
          value.trim().startsWith("[") &&
          value.trim().endsWith("]")
        ) {
          try {
            newRow[key] = JSON.parse(value);
          } catch {
            // If JSON parsing fails, keep as a string
          }
        }
      });
      return newRow;
    });
    setParsedData(processedData);
  };

  // --- Smart Header Validator ---
  const validateHeaders = (
    headers: string[],
    schema: HeaderSchema
  ): { valid: boolean; message: string } => {
    const normalize = (str: string) => str.trim().toLowerCase();
    const received = headers.map(normalize);

    for (const key in schema) {
      const { required, aliases } = schema[key];
      // All possible names: primary and its aliases
      const possibilities = [key, ...(aliases || [])].map(normalize);
      const matchFound = received.some((h) => possibilities.includes(h));
      if (required && !matchFound) {
        return {
          valid: false,
          message: `Missing required column: "${key}" (acceptable: ${possibilities.join(
            ", "
          )})`,
        };
      }
    }
    return { valid: true, message: "" };
  };

  // --- Template Download Functions ---
  const downloadTemplate = (type: "csv" | "xlsx") => {
    // Use provided templateData, else build a default row from headerSchema if available
    const data =
      templateData && templateData.length > 0
        ? templateData
        : generateDefaultTemplate();
    if (!data || data.length === 0) {
      return toast.error("No template data available.");
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    const fileName = `template.${type}`;

    if (type === "csv") {
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } else {
      XLSX.writeFile(wb, fileName);
    }
  };

  // If no templateData is provided, generate a default row from the headerSchema.
  const generateDefaultTemplate = (): DataRow[] => {
    if (!headerSchema) return [];
    const row: DataRow = {};
    Object.keys(headerSchema).forEach((key) => {
      row[key] = headerSchema[key].required
        ? "REQUIRED_SAMPLE"
        : "OPTIONAL_SAMPLE";
    });
    return [row];
  };

  // --- Submit Data ---
  const handleSubmit = () => {
    if (parsedData.length === 0) {
      toast.error("Please select a valid file with content before submitting.");
      return;
    }
    onSubmit(parsedData);
  };

  // --- UI ---
  return (
    <div
      className="text-center w-full max-w-[98vw] lg:max-w-[80vw] mx-auto bg-white shadow-sm rounded-xl p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      {/* Icon & Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-full border border-[#24770F] h-[60px] w-[60px] flex items-center justify-center">
          <BiFile size={35} className="text-green-600" />
        </div>
        <h2 className="font-medium text-gray-800">Bulk Upload {title ?? ""}</h2>
      </div>

      {/* Drop Zone */}
      <div className="text-gray-600 text-sm mb-2">
        Drag and drop your file here.
      </div>
      <div className="text-gray-400 text-sm mb-4">- or -</div>

      {/* Browse Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary text-white px-4 py-2 rounded transition"
      >
        Browse
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".xls,.xlsx,.vcf,.csv"
      />

      {/* Template Download Buttons */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => downloadTemplate("csv")}
          className="bg-transparent text-blue-600 underline text-sm"
        >
          Download CSV Template
        </button>
        <button
          onClick={() => downloadTemplate("xlsx")}
          className="bg-transparent text-blue-600 underline text-sm"
        >
          Download XLSX Template
        </button>
      </div>

      {/* Display Persistent Validation Error, if any */}
      {validationError && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
          {validationError}
        </div>
      )}

      {/* Uploaded File List */}
      {files.length > 0 && (
        <ul className="mt-4 text-sm bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
          {files.map((file, idx) => (
            <li key={idx} className="truncate">
              📄 {file.name}
            </li>
          ))}
        </ul>
      )}

      {/* Preview Table */}
      {parsedData.length > 0 && (
        <div className="mt-6 overflow-auto max-h-64 border rounded-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {Object.keys(parsedData[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border-b">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.slice(0, 10).map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(row).map((value, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 border-b truncate max-w-[200px]"
                    >
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-gray-500 text-right px-2 py-1">
            Showing {Math.min(10, parsedData.length)} of {parsedData.length}{" "}
            rows
          </div>
        </div>
      )}

      {/* Footer Info */}
      <p className="text-xs text-gray-500 my-4 max-w-md mx-auto">
        You can import up to 5000 records through a .csv or .xlsx file.
      </p>

      {/* Submit Button */}
      <Button
        text="Submit"
        type="submit"
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FileUploadCard;
