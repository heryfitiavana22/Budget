import classNames from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function NavItem({
    name,
    link,
    icon,
    active = false,
    onClick,
}: NavItemProps) {
    return (
        <li onClick={onClick}>
            <Link
                href={link}
                className={classNames(
                    "p-2 flex gap-2 w-full h-full hover:bg-blue-400 rounded-md transition-colors",
                    { "bg-blue-400 active": active }
                )}
            >
                <span>{icon}</span>
                <span>{name}</span>
            </Link>
        </li>
    );
}

type NavItemProps = PropsWithChildren<{
    name: string;
    link: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}>;
