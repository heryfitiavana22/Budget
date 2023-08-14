"use client";
import { User } from "@/database";
import { useSession } from "next-auth/react";

export function useUserConnected() {
    const session = useSession();
    const user = {
        id: (session.data?.user as any)?.id || 0,
        name: session.data?.user?.name || "",
    } as User;

    return {
        user,
    };
}
