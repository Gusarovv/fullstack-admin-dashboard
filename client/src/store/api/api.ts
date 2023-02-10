import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, resetUser, setUser } from '../reducers/UserSlice';
import jwt_decode from 'jwt-decode';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefresh = async (args: FetchArgs, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as { accessToken: string };
            const userInfo: IUser = jwt_decode(accessToken);
            api.dispatch(setUser(userInfo));
            localStorage.setItem('token', accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(resetUser());
        }
    }
    return result;
};

export const serverAPI = createApi({
    reducerPath: 'serverAPI',
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({}),
});
