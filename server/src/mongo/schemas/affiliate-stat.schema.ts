import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';

export interface IAffiliateStat {
    userId: string;
    affiliateSales: string[];
}

export type AffiliateStatDocument = AffiliateStat & Document;
export type AffiliateStatLeanDocument = LeanDocument<AffiliateStat & Document & { _id: Types.ObjectId }>;

@Schema({ timestamps: true })
export class AffiliateStat implements IAffiliateStat {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: [Types.ObjectId], ref: 'Transaction', required: true })
    affiliateSales: string[];
}

export const AffiliateStatSchema = SchemaFactory.createForClass(AffiliateStat);
