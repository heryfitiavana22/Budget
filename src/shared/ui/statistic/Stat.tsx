import classNames from "classnames";
import { PropsWithChildren } from "react";

export function Stat({ label, value, currency, classNameLabel }: StatProps) {
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
