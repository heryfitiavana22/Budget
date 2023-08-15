import { User, db, users } from "@/database";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const currentUser = (await request.json()) as User;
    const userFind = db.query.users.findFirst({
        where: eq(users.email, currentUser.email),
    });

    if (
        userFind &&
        bcrypt.compareSync(currentUser.password, userFind.password)
    ) {
        const { password, ...rest } = userFind;
        return NextResponse.json(rest);
    }
    return NextResponse.json(null);
}
