import { IDailyData } from './daily-data.interface';
import { IMonthlyData } from './monthly-data.interface';

interface ISalesByCategory {
    [key: string]: number;
}
export interface IOverallStat {
    totalCustomers: number;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: IMonthlyData[];
    dailyData: IDailyData[];
    salesByCategory: ISalesByCategory[];
}

export interface ITodayAndTotalStat {
    todayStats: IDailyData;
    thisMonthStats: IMonthlyData;
    totalCustomers: number;
    yearlyTotalSoldUnits: number;
    yearlySalesTotal: number;
    salesByCategory: ISalesByCategory[];
}
