import React from "react";
import { cn } from "./utils";

export const Input = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        className={cn(
          "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 px-3 text-sm outline-none transition",
          error && "ring-2 ring-red-400"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <div className="text-red-500 text-sm font-medium pl-1">{error}</div>
      )}
    </div>
  );
};
