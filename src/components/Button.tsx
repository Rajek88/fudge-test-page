import { Icon } from "@phosphor-icons/react"
import React from "react"
import { PropsWithChildren } from "react"
import { cn } from "./utils"
import { useNavigate } from "react-router-dom"

type ButtonProps = PropsWithChildren<
    {
        variant?: "primary" | "inline"
        icon?: Icon
        negativeMargin?: boolean
    } & ({ href: string } | { onClick: () => void })
>

export const Button = ({
    variant = "primary",
    icon: Icon,
    children,
    negativeMargin,
    ...rest
}: ButtonProps) => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => {
                if ("onClick" in rest) {
                    rest.onClick()
                } else {
                    if (rest.href.startsWith("http")) {
                        window.open(rest.href, "_blank")
                    } else {
                        navigate(rest.href)
                    }
                }
            }}
            className={cn(
                "p-2.5 px-3 rounded-md font-medium text-sm transition",
                negativeMargin && "-mx-3 -m-2.5",
                variant === "primary" &&
                    "bg-blue-500 text-white hover:bg-blue-600",
                variant === "inline" && "hover:bg-blue-50 text-blue-600"
            )}
        >
            {Icon && <Icon />}
            {children}
        </button>
    )
}
