export interface ITransaction {
    _id: string;
    userId: string;
    cost: number;
    products: string[];
}

export interface ITransactionsWithTotal {
    transactions: ITransaction[];
    total: number;
}
