import { FinanceAndTag } from "@/database";
import { useState } from "react";

export function useTableFinances(initialValues: FinanceAndTag[] = []) {
    const [finances, setFinances] = useState(initialValues);

    return {
        finances,
        deleteFinance: (idFinance: number) => {
            
        }
    }
}
