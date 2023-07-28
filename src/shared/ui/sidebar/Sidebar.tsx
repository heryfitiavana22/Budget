"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { NavItem } from "./components";
import { BarIcon, ChartIcon, CloseIcon, FinanceIcon } from "../icons";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export function Sidebar({}: SidebarProps) {
    const [showNav, setShowNav] = useState(false);
    const pathname = usePathname() as ItemNav;
    const [activePage, setActivePage] = useState(pathname);

    return (
        <div className="md:static md:w-auto md:block md:p-4 w-full flex justify-between py-4 absolute left-0 top-0 md:bg-blue-500 md:m-2 rounded-md md:h-full">
            <div className="logo text-lg px-2 w-full">
                <div className="w-6 h-6 rounded-full bg-blue-500 md:bg-white"></div>
            </div>
            <ul
                className={classNames(
                    "bg-blue-500 md:static md:h-auto md:w-full md:mt-8 md:py-0 py-3 fixed top-0 flex flex-col w-2/4 h-screen text-white z-50 transition-all",
                    showNav ? "right-0" : "-right-full"
                )}
            >
                {navitems.map((item, k) => (
                    <NavItem
                        name={item.name}
                        link={item.link}
                        icon={item.Icon}
                        active={item.link == activePage}
                        key={k}
                    />
                ))}
                {showNav && (
                    <li className="md:hidden absolute top-1 -left-8 text-blue-500">
                        <CloseIcon
                            className="w-8 h-8"
                            onClick={() => setShowNav(false)}
                        />
                    </li>
                )}
            </ul>
            {!showNav && (
                <span
                    className="md:hidden block px-2"
                    onClick={() => setShowNav(true)}
                >
                    <BarIcon />
                </span>
            )}
        </div>
    );
}

const navitems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        Icon: <ChartIcon />,
    },
    {
        name: "Finances",
        link: "/finances",
        Icon: <FinanceIcon />,
    },
] as const;

type ItemNav = (typeof navitems)[number]["link"];

type SidebarProps = PropsWithChildren<{}>;
