import { FinanceAndTag, FinanceTag } from "@/database";

export function groupByFinance(financesTags: FinanceTag[]) {
    const result: FinanceAndTag[] = [];
    const idFinancePicked: number[] = [];
    for (let financeTag of financesTags) {
        // on ne prends pas la finance déjà ajouté
        if (!idFinancePicked.includes(financeTag.financeId)) {
            result.push({
                ...financeTag.finance,
                tags: getTagOfFinance(financesTags, financeTag.financeId),
            });
            idFinancePicked.push(financeTag.financeId);
        }
    }

    return result;
}

export function getTagOfFinance(financesTags: FinanceTag[], idFinance: number) {
    const result: string[] = [];
    for (let financeTag of financesTags) {
        if (financeTag.financeId == idFinance) result.push(financeTag.tag.name);
    }
    return result;
}
