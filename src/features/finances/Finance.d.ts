import { FinanceAndTag } from "@/database";

declare type FinanceFetched = {
    finances: FinanceAndTag[];
    pageCounter: number;
};
