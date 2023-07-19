import { PropsWithChildren } from "react";

export function NavItem({ name, link }: NavItemProps) {
    return (
        <li>
            <a
                href={link}
                className="p-2 flex w-full h-full hover:bg-blue-400 rounded-md transition-colors"
            >
                {name}
            </a>
        </li>
    );
}

type NavItemProps = PropsWithChildren<{
    name: string;
    link: string;
}>;
