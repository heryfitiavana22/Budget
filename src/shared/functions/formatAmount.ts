export function formatAmount(amount: number) {
    return new Intl.NumberFormat("fr-FR").format(amount);
}
