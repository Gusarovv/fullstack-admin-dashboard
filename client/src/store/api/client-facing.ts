import { IProductWithStat } from '../interface/product.interface';
import { ITransactionsWithTotal } from '../interface/transaction.interface';
import { IUser } from '../reducers/UserSlice';
import { serverAPI } from './api';

export const clientAPI = serverAPI.injectEndpoints({
    endpoints: (build) => ({
        products: build.query<IProductWithStat[], void>({
            query: (data) => ({
                url: '/client/products',
            }),
        }),
        customers: build.query<IUser[], void>({
            query: (data) => ({
                url: '/client/customers',
            }),
        }),
        transactions: build.query<
            ITransactionsWithTotal,
            { page?: number; pageSize?: number; sort?: string; search?: string }
        >({
            query: (data) => ({
                url: '/client/transactions',
                params: data,
            }),
        }),
        geography: build.query<{ id: string; value: number }[], void>({
            query: (data) => ({
                url: '/client/geography',
            }),
        }),
    }),
});
