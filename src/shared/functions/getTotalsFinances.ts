import { FinanceAndTag } from "@/database";

export function getTotalsFinance(finances: FinanceAndTag[]) {
    let income = 0,
        expense = 0;
    finances.forEach((finance) => {
        if (finance.type == "depense") return (expense += finance.amount);
        if (finance.type == "revenue") return (income += finance.amount);
    });

    return {
        income,
        expense,
    };
}
