import { FinanceAndTag } from "@/database";
import { PropsWithChildren } from "react";
import { formatAmount, getTotalsFinance, Stat } from "@/shared";

export function Statistics({ data }: StatisticsProps) {
    const { income, expense } = getTotalsFinance(data);

    return (
        <div className="grid md:grid-cols-2 gap-3 mt-3">
            <Stat
                label="Revenues :"
                value={formatAmount(income)}
                currency="Ar"
                classNameLabel="text-green-500"
            />
            <Stat
                label="Dépenses :"
                value={formatAmount(expense)}
                currency="Ar"
                classNameLabel="text-red-500"
            />
        </div>
    );
}

type StatisticsProps = PropsWithChildren<{
    data: FinanceAndTag[];
}>;
