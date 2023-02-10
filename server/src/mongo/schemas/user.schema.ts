import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface IUser {
    name: string;
    email: string;
    password: string;
    city: string;
    country: string;
    occupation: string;
    phone: string;
    transactions: string[];
    role: string;
}

export type UserDocument = User & Document;
export type UserLeanDocument = LeanDocument<User & Document & { _id: Types.ObjectId }>;

@Schema({ timestamps: true })
export class User implements IUser {
    @Prop({ type: String, required: true, min: 2, max: 80 })
    name: string;

    @Prop({ type: String, required: true, min: 4, max: 80, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    city: string;

    @Prop({ type: String })
    country: string;

    @Prop({ type: String })
    occupation: string;

    @Prop({ type: String })
    phone: string;

    @Prop({ type: [Types.ObjectId], ref: 'Transaction', default: [] })
    transactions: string[];

    @Prop({ type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
