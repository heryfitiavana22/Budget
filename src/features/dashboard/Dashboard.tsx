"use client";
import { FinanceAndTag } from "@/database";
import {
    Spinner,
    Stat,
    formatAmount,
    getAllData,
    getTotalsFinance,
} from "@/shared";
import { PropsWithChildren, useEffect, useState } from "react";
import { FinanceFetched } from "../finances/Finance";

export function Dashboard({}: DashboardProps) {
    const [finances, setFinances] = useState<FinanceAndTag[]>([]);
    const [loading, setLoading] = useState(true);
    const { income, expense } = getTotalsFinance(finances);

    useEffect(() => {
        new Promise(async (resolve) => {
            const data = (await getAllData({
                uri: "/api/finance",
            })) as unknown as FinanceFetched;
            setFinances(data.finances);
            setLoading(false);
            resolve("");
        });
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="">
            <div className="grid md:grid-cols-3 gap-3">
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
                <Stat
                    label="Reste :"
                    value={formatAmount(income - expense)}
                    currency="Ar"
                    classNameLabel="text-blue-500"
                />
            </div>
        </div>
    );
}

type DashboardProps = PropsWithChildren<{}>;
