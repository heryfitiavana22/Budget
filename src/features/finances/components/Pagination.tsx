import { ArrowLeft, ArrowRight } from "@/shared";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";

export function Pagination({
    currentPage,
    onIncrement,
    onDecrement,
    disableNext = false,
    disablePrev = true,
}: PaginationProps) {
    return (
        <div className="flex justify-end mt-3">
            <div className="flex items-center gap-2">
                <IconButton
                    onClick={() => {
                        if (currentPage > 1) onDecrement();
                    }}
                    disabled={disablePrev}
                >
                    <ArrowLeft />
                </IconButton>
                <span>{currentPage}</span>
                <IconButton onClick={onIncrement} disabled={disableNext}>
                    <ArrowRight />
                </IconButton>
            </div>
        </div>
    );
}

type PaginationProps = PropsWithChildren<{
    currentPage: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disablePrev?: boolean;
    disableNext?: boolean;
}>;
