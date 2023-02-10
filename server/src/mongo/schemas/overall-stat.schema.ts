import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';
import { DailyDataSchema, IDailyData, IMonthlyData, MonthlyDataSchema } from './monthy-dayily-stats.schema';

export interface ISalesByCategory {
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

export type OverallStatDocument = OverallStat & Document;
export type OverallStatLeanDocument = LeanDocument<OverallStat & Document & { _id: Types.ObjectId }>;

@Schema({ timestamps: true })
export class OverallStat implements IOverallStat {
    @Prop({ type: Number, required: true })
    totalCustomers: number;

    @Prop({ type: Number, required: true })
    yearlySalesTotal: number;

    @Prop({ type: Number, required: true })
    yearlyTotalSoldUnits: number;

    @Prop({ type: Number, required: true })
    year: number;

    @Prop({ type: [MonthlyDataSchema], default: [] })
    monthlyData: IMonthlyData[];

    @Prop({ type: [DailyDataSchema], default: [] })
    dailyData: IDailyData[];

    @Prop({ type: Map, of: Number })
    salesByCategory: ISalesByCategory[];
}

export const OverallStatSchema = SchemaFactory.createForClass(OverallStat);
