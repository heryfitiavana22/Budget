import { CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";

export function Spinner({}: SpinnerProps) {
    return (
        <div
            className="flex justify-center items-center fixed w-full h-full top-0 left-0"
            style={{ zIndex: 99999 }}
        >
            <div>
                <CircularProgress />
            </div>
        </div>
    );
}

type SpinnerProps = PropsWithChildren<{}>;
