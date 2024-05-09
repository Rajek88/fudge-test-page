import { Warning, WarningCircle } from "@phosphor-icons/react"
import clsx from "clsx"
import React, { PropsWithChildren } from "react"

export const Callout = ({
    children,
    variant,
}: PropsWithChildren<{ variant: "warning" | "error" }>) => {
    let Icon = Warning
    if (variant === "error") {
        Icon = WarningCircle
    }

    return (
        <div
            className={clsx(
                "p-3 font-medium flex items-center space-x-2 rounded-md text-sm",
                variant === "warning" && "bg-amber-50 text-amber-700",
                variant === "error" && "bg-red-50 text-red-500"
            )}
        >
            <Icon size={22} />
            <div>{children}</div>
        </div>
    )
}
