import { IUser } from '../reducers/UserSlice';
import { serverAPI } from './api';

export const userAPI = serverAPI.injectEndpoints({
    endpoints: (build) => ({
        /** Получение данных о пользователе на основании токена */
        me: build.query<IUser, void>({
            query: (data) => ({
                url: '/user/@me',
            }),
        }),
        /** Получение данных о транзакциях пользователе на основании токена */
        meTransactions: build.query<string[], void>({
            query: (data) => ({
                url: '/user/transactions/@me',
            }),
        }),
    }),
});
