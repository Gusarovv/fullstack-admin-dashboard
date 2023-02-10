import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../mongo/schemas/token.schema';
import { UserLeanDocument } from '../mongo/schemas/user.schema';

export interface IPayloadJWT {
    _id: string;
    name: string;
    email: string;
    city: string;
    country: string;
    occupation: string;
    phone: string;
    role: string;
}

@Injectable()
export class JwtGenerateService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
    ) {}

    /** Генерация токенов */
    async generateTokens(user: UserLeanDocument) {
        const payload: IPayloadJWT = {
            _id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            country: user.country,
            occupation: user.occupation,
            phone: user.phone,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '30m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '14d',
        });

        await this.saveRefreshToken(user._id, refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }

    /** Сохранение токена в БД */
    private async saveRefreshToken(userId: string, refreshToken: string): Promise<Token> {
        const tokenData = await this.tokenModel.findOne({ userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return this.tokenModel.create({ userId, refreshToken });
    }
}
