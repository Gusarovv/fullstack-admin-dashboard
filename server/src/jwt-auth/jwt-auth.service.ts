import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../mongo/schemas/token.schema';
import { User, UserDocument, UserLeanDocument } from '../mongo/schemas/user.schema';
import { AuthUserDto } from './dto/auth.dto';
import { JwtGenerateService } from './jwt-generate.service';

import * as bcrypt from 'bcrypt';
import { JwtVerifyService } from './jwt-verify.service';

@Injectable()
export class JwtAuthService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtGenerateService: JwtGenerateService,
        private readonly jwtVerifyService: JwtVerifyService,
    ) {}

    /** Авторизация в админ панель */
    async login(dto: AuthUserDto) {
        const user = await this.userModel.findOne<UserLeanDocument>({ email: dto.email }).lean();
        if (!user) throw new BadRequestException('Incorrect login or password');

        // Если нет доступа
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            throw new ForbiddenException(`You don't have access to the admin panel`);
        }

        // Сравнение введенного пароля и пароля из БД
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (!passwordEquals) throw new BadRequestException('Incorrect login or password');

        // Генерация токенов
        const tokens = await this.jwtGenerateService.generateTokens(user);
        return tokens;
    }

    /** Деавторизация */
    async logout(refreshToken: string): Promise<void> {
        await this.tokenModel.remove({ refreshToken });
        return;
    }

    /** Обновление токенов */
    async refresh(refreshToken: string) {
        const tokenDoc = await this.tokenModel.findOne({ refreshToken }).lean();
        if (!tokenDoc) throw new UnauthorizedException();

        // Верификация refresh токена (ttl)
        try {
            this.jwtVerifyService.validateRefreshToken(refreshToken);
        } catch (e) {
            await this.logout(refreshToken);
            throw new UnauthorizedException();
        }

        // Получение информации о пользователе
        const userData = await this.userModel.findById(tokenDoc.userId).lean();

        // Генерация новых токенов
        const newTokens = await this.jwtGenerateService.generateTokens(userData);
        return newTokens;
    }
}
