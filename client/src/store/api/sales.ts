import { IOverallStat, ITodayAndTotalStat } from '../interface/overall-stat.interface';
import { serverAPI } from './api';

export const salesAPI = serverAPI.injectEndpoints({
    endpoints: (build) => ({
        overall: build.query<IOverallStat, void>({
            query: (data) => ({
                url: '/sales/overall-stats',
            }),
        }),
        todayAndTotal: build.query<ITodayAndTotalStat, void>({
            query: (data) => ({
                url: '/sales/today-total-stats',
            }),
        }),
    }),
});
