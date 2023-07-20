import { FinanceAndTag } from "@/database";
import { deleteOneDataById } from "@/shared";
import { useState } from "react";

export function useTableFinances(initialValues: FinanceAndTag[] = []) {
    const [finances, setFinances] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    return {
        finances,
        loading,
        setFinances,
        setLoading,
        deleteFinance: async (idFinance: number) => {
            setLoading(true);
            try {
                await deleteOneDataById("/api/finance", idFinance);
                const newFinances = finances.filter(
                    (finance) => finance.id !== idFinance
                );
                setFinances(newFinances);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        },
    };
}
