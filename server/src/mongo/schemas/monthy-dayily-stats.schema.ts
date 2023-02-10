import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IMonthlyData {
    month: string;
    totalSales: number;
    totalUnits: number;
}

@Schema({ _id: false })
class MonthlyData implements IMonthlyData {
    @Prop({ type: String, required: true })
    month: string;

    @Prop({ type: Number, required: true })
    totalSales: number;

    @Prop({ type: Number, required: true })
    totalUnits: number;
}
export const MonthlyDataSchema = SchemaFactory.createForClass(MonthlyData);

export interface IDailyData {
    date: string;
    totalSales: number;
    totalUnits: number;
}

@Schema({ _id: false })
class DailyData implements IDailyData {
    @Prop({ type: String, required: true })
    date: string;

    @Prop({ type: Number, required: true })
    totalSales: number;

    @Prop({ type: Number, required: true })
    totalUnits: number;
}
export const DailyDataSchema = SchemaFactory.createForClass(DailyData);
