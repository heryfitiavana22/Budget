"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

export function Login({}: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onSubmit = async () => {
        if (!email || !password) return;
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        console.log("result");
        console.log(result);

        if (result) {
            if (result.error) return;
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen">
            <div className="">
                <input
                    type="email"
                    placeholder="email"
                    className="border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="">
                <input
                    type="password"
                    placeholder="password"
                    className="border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={onSubmit}>Se connecter</button>
        </div>
    );
}

type LoginProps = PropsWithChildren<{}>;
