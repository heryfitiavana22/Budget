import classNames from "classnames";
import { PropsWithChildren } from "react";

export function NavItem({ name, link, icon, active = false }: NavItemProps) {
    return (
        <li>
            <a
                href={link}
                className={classNames(
                    "p-2 flex gap-2 w-full h-full hover:bg-blue-400 rounded-md transition-colors",
                    { "bg-blue-400 active": active }
                )}
            >
                <span>{icon}</span>
                <span>{name}</span>
            </a>
        </li>
    );
}

type NavItemProps = PropsWithChildren<{
    name: string;
    link: string;
    icon?: React.ReactNode;
    active?: boolean;
}>;
