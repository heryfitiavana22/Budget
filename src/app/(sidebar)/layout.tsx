import { PropsWithChildren } from "react";
import { Sidebar } from "@/shared/";

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full md:p-4 p-2 pt-14">{children}</div>
        </main>
    );
}

type LayoutProps = PropsWithChildren<{}>;
