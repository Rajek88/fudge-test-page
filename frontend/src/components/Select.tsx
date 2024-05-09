import React from "react";
import { cn } from "./utils";

export const Select = ({
  value,
  onChange,
  error,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: string[];
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <select
        className={cn(
          "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 px-3 text-sm outline-none transition",
          error && "ring-2 ring-red-400"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      {error && (
        <div className="text-red-500 text-sm font-medium pl-1">{error}</div>
      )}
    </div>
  );
};
