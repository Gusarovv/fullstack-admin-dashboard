import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';

export interface IProduct {
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    supply: number;
}

export type ProductDocument = Product & Document;
export type ProductLeanDocument = LeanDocument<Product & Document & { _id: Types.ObjectId }>;

@Schema({ timestamps: true })
export class Product implements IProduct {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    category: string;

    @Prop({ type: Number, required: true })
    rating: number;

    @Prop({ type: Number, required: true })
    supply: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
