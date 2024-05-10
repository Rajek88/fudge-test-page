import React, { PropsWithChildren } from "react";
import { cn } from "./utils";

export const Page = ({
  title,
  children,
  className,
}: PropsWithChildren<{ title: string; className?: string }>) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center p-10">
      <div className="space-y-4 w-10/12">
        <div className="text-xl font-semibold">{title}</div>
        <div
          className={cn(
            "bg-white rounded-lg shadow px-5 py-2 w-full",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
