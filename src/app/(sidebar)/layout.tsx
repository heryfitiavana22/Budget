import { PropsWithChildren } from "react";
import { Sidebar } from "@/shared/";

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full p-4">{children}</div>
        </main>
    );
}

type LayoutProps = PropsWithChildren<{}>;
