import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IToken {
    userId: string;
    refreshToken: string;
}

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token implements IToken {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
