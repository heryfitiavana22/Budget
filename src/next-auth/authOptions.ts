import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.NEXTAUTH_URL;

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Budget",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const response = await fetch(`${BASE_URL}/api/user/iscorrect`, {
                    method: "post",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(credentials),
                });
                try {
                    const responseData = (await response.json()) as any;
                    if (responseData) return responseData;
                } catch (error) {
                    return null;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        },
        async jwt({ token, user }) {
            if (user) {
                const currentUser = user as any;
                return {
                    ...token,
                    id: currentUser.id,
                };
            }
            return token;
        },
    },
    pages: { signIn: "/auth/login" },
};
