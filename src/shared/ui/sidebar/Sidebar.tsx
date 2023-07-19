import { PropsWithChildren } from "react";
import { NavItem } from "./components";

export function Sidebar({}: SidebarProps) {
    return (
        <div className="p-4 bg-blue-500 text-white m-2 rounded-md h-full">
            <div className="logo text-lg p-2">Budget</div>
            <ul className="grid mt-8">
                <NavItem name="Finances" link="#" />
                <NavItem name="Items" link="#" />
            </ul>
        </div>
    );
}

type SidebarProps = PropsWithChildren<{}>;
