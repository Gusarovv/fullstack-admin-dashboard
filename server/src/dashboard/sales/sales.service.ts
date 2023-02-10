import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OverallStat, OverallStatDocument } from '../../mongo/schemas/overall-stat.schema';

@Injectable()
export class SalesService {
    constructor(@InjectModel(OverallStat.name) private overallStatModel: Model<OverallStatDocument>) {}

    async findOverallStats() {
        // hardcoded values (dataset для тестирования имеет только 2022 год)
        const currentYear = 2022;

        const overallStats = await this.overallStatModel.findOne({ year: currentYear });
        return overallStats;
    }

    async findTodayAndTotalStats() {
        // hardcoded values
        const currentMonth = 'November';
        const currentDay = '2022-11-15';

        const overallStats = await this.findOverallStats();
        if (!overallStats) throw new NotFoundException();

        const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, salesByCategory } = overallStats;

        const thisMonthStats = overallStats.monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStats.dailyData.find(({ date }) => {
            return date === currentDay;
        });

        return {
            todayStats,
            thisMonthStats,
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            salesByCategory,
        };
    }
}
