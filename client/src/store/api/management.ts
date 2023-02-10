import { IAffiliateStat } from '../interface/affiliate-stat.interface';
import { ITransaction } from '../interface/transaction.interface';
import { IUser } from '../reducers/UserSlice';
import { serverAPI } from './api';

export const managementAPI = serverAPI.injectEndpoints({
    endpoints: (build) => ({
        admins: build.query<IUser[], void>({
            query: (data) => ({
                url: '/management/admins',
            }),
        }),
        mePerformance: build.query<
            { user: IUser & { affiliateStats: IAffiliateStat }; sales: ITransaction[] },
            void
        >({
            query: (data) => ({
                url: '/management/performance/@me',
            }),
        }),
    }),
});
