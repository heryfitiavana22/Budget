import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

export function useFormSubmit() {
    const [tags, setTags] = useState<string[]>([]);
    const [amount, setAmount] = useState<number>();
    const [label, setLabel] = useState("");

    return {
        tags,
        amount,
        label,
        handleAmount: (e: ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.currentTarget.value)),
        handleLabel: (e: ChangeEvent<HTMLInputElement>) =>
            setLabel(e.currentTarget.value),
        handleChangeTag: (event: SelectChangeEvent<string[]>) => {
            const {
                target: { value },
            } = event;
            setTags(typeof value === "string" ? value.split(",") : value);
        },
        handleSubmit: (idFinance = 0) => {
            return (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
            };
        },
    };
}
