"use client"
import { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react"

export function NextAuthProvider({ children }: NextAuthProviderProps) {
    return <SessionProvider>{children}</SessionProvider>
}

type NextAuthProviderProps = PropsWithChildren<{}>
