import { PropsWithChildren } from "react";
import { Sidebar } from "@/shared/";
import { protectIfNotConnected } from "@/next-auth";

export default async function Layout({ children }: LayoutProps) {
    protectIfNotConnected();

    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full md:p-4 p-2 pt-14">{children}</div>
        </main>
    );
}

type LayoutProps = PropsWithChildren<{}>;
