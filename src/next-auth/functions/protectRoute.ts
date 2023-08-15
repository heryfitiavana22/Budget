import { authOptions } from "../authOptions" 
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export async function protectIfNotConnected() {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/login")
}

export async function protectIfConnected() {
    const session = await getServerSession(authOptions)
    if (session) redirect("/dashboard")
}
