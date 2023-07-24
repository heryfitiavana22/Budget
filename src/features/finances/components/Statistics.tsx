import { FinanceAndTag } from "@/database";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { getTotals } from "../finances.helper";
import { formatAmount } from "@/shared";

export function Statistics({ data }: StatisticsProps) {
    const { income, expense } = getTotals(data);
    
    return (
        <div className="grid grid-cols-2 gap-3 mt-3">
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

function Stat({ label, value, currency, classNameLabel }: StatProps) {
    return (
        <div className="grid gap-5 p-5 bg-gray-100 rounded-lg">
            <span className={classNames(classNameLabel)}>{label}</span>
            <span className="">
                {value} {currency}
            </span>
        </div>
    );
}

type StatProps = PropsWithChildren<{
    label: string;
    value: number | string;
    currency?: string;
    classNameLabel?: string;
}>;

type StatisticsProps = PropsWithChildren<{
    data: FinanceAndTag[];
}>;
