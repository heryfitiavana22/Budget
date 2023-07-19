import { PropsWithChildren } from "react";
import classNames from "classnames";
import Link from "next/link";

export function TableAction({
    href,
    children,
    className,
    type,
    disabled = false,
}: TableActionProps) {
    const classNameValue = classNames(
        "cursor-pointer",
        colorFactory(type, disabled),
        className
    );

    if (href) return <Link href={href}>{children}</Link>;

    return <div className={classNameValue}>{children}</div>;
}

function colorFactory(type: TableActionType, disabled = false) {
    if (type == "edit") return disabled ? "text-blue-300" : "text-blue-400";
    if (type == "delete") return disabled ? "text-red-300" : "text-red-400";
    return "";
}

type TableActionProps = PropsWithChildren<{
    className?: string;
    href?: string;
    type: TableActionType;
    disabled?: boolean;
}>;

type TableActionType = "edit" | "delete";
