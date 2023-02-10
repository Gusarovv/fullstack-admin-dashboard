import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ITransaction {
    userId: string;
    cost: number;
    products: string[];
}

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction implements ITransaction {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: Number, required: true })
    cost: number;

    @Prop({ type: [Types.ObjectId], required: true })
    products: string[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
