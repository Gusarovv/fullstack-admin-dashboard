import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';
import { DailyDataSchema, IDailyData, IMonthlyData, MonthlyDataSchema } from './monthy-dayily-stats.schema';

export interface IProductStat {
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: IMonthlyData[];
    dailyData: IDailyData[];
}

export type ProductStatDocument = ProductStat & Document;
export type ProductStatLeanDocument = LeanDocument<ProductStat & Document & { _id: Types.ObjectId }>;

@Schema({ timestamps: true })
export class ProductStat implements IProductStat {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: string;

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
}

export const ProductStatSchema = SchemaFactory.createForClass(ProductStat);
