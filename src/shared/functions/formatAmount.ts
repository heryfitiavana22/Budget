export function formatAmount(amount: number) {
    return new Intl.NumberFormat("de-DE").format(amount);
}
