import { protectIfConnected } from "@/next-auth";
import { Login } from "./login";

export default function Page({}: PageProps) {
    protectIfConnected();
    
    return <Login />;
}

type PageProps = {};
