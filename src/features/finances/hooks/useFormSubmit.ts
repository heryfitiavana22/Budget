import { FinanceAndTag } from "@/database";
import { createData, updateOneDataById } from "@/shared";
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";

export function useFormSubmit(financeToUpdate?: FinanceAndTag) {
    const [tags, setTags] = useState<string[]>(financeToUpdate?.tags || []);
    const [amount, setAmount] = useState<number>(financeToUpdate?.amount || 0);
    const [label, setLabel] = useState(financeToUpdate?.label || "");
    const [message, setMessage] = useState("");
    const [submitResult, setSubmitResult] = useState<Alert>("info");
    const [loading, setLoading] = useState(false);

    return {
        tags,
        amount,
        label,
        message,
        submitResult,
        loading,
        handleAmount: (e: ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.currentTarget.value)),
        handleLabel: (e: ChangeEvent<HTMLInputElement>) =>
            setLabel(e.currentTarget.value),
        handleChangeTag: (
            e: SyntheticEvent<Element, Event>,
            values: string[]
        ) => {
            setTags(values);
        },
        handleSubmit: async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const finance = {
                ...financeToUpdate,
                amount,
                label,
                tags,
            } as FinanceAndTag;

            setLoading(true);

            try {
                // if update
                if (financeToUpdate) {
                    await updateOneDataById("/api/finance", finance);
                    setSubmitResult("success");
                    setLoading(false);
                    return setMessage("Finance mis à jour");
                }
                await createData("/api/finance", finance);
                setSubmitResult("success");
                setLoading(false);
                return setMessage("Finance crée");
            } catch (error: any) {
                setMessage(error.message);
                setSubmitResult("error");
                setLoading(false);
            }
        },
    };
}
