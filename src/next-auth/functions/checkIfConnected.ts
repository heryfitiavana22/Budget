import { authOptions } from "../authOptions" 
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export async function checkIfNotConnected() {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/api/auth/signin")
}

export async function checkIfConnected() {
    const session = await getServerSession(authOptions)
    if (session) redirect("/dashboard")
}
