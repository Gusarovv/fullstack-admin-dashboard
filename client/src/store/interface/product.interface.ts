import { IDailyData } from './daily-data.interface';
import { IMonthlyData } from './monthly-data.interface';

export interface IProductStat {
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: IMonthlyData[];
    dailyData: IDailyData[];
}

export interface IProductWithStat {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    supply: number;
    stat: IProductStat;
}
