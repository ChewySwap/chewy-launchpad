export function formatBalance(balance: number | string): string {
    if (typeof balance === "string") {
        balance = parseFloat(balance);
    }
    let formattedBalance: string;
    if (balance >= 1) {
        formattedBalance = balance.toFixed(2);
    } else if (balance >= 0.01) {
        formattedBalance = balance.toFixed(4);
    } else if (balance >= 0.00001) {
        formattedBalance = balance.toFixed(6);
    } else {
        formattedBalance = balance.toExponential(2);
    }
    return parseFloat(formattedBalance).toLocaleString();
}