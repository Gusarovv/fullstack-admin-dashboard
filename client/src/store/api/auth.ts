import { serverAPI } from './api';

type DataResponseAuth = {
    accessToken: string;
};

export type ResponseAuth = {
    data: DataResponseAuth;
};

export const authAPI = serverAPI.injectEndpoints({
    endpoints: (build) => ({
        /** Авторизация */
        login: build.mutation<DataResponseAuth, { email: string; password: string }>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password,
                },
            }),
        }),
        /** Деавторизация */
        logout: build.mutation<DataResponseAuth, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});
