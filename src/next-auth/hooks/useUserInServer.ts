import { User } from "@/database"
import { authOptions } from "../authOptions" 
import { getServerSession } from "next-auth"

export async function useUserInServer() {
    const session = await getServerSession(authOptions)
    const user = {
        id: (session?.user as any)?.id || 0,
        name: session?.user?.name || "",
    } as User

    return {
        user
    }
}
