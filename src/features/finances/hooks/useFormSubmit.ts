import { FinanceAndTag } from "@/database";
import { createData, updateOneDataById } from "@/shared";
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";

export function useFormSubmit() {
    const [tags, setTags] = useState<string[]>([]);
    const [amount, setAmount] = useState<number>();
    const [label, setLabel] = useState("");
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
        handleSubmit: (idFinance = 0) => {
            return async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const finance = {
                    amount,
                    label,
                    tags,
                } as FinanceAndTag;

                if (isNaN(idFinance))
                    return setMessage("Erreur sur l'id du finance");
                setLoading(true);

                try {
                    // if update
                    if (idFinance !== 0) {
                        finance.id = idFinance;
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
                }
            };
        },
    };
}
