import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayloadJWT } from './jwt-generate.service';

@Injectable()
export class JwtVerifyService {
    constructor(private readonly jwtService: JwtService) {}

    /**
     * Верификация access токена
     * @param accessToken access токен
     * @returns payload или проброс exception
     */
    validateAccessToken(accessToken: string): IPayloadJWT {
        return this.jwtService.verify(accessToken, { secret: process.env.JWT_ACCESS_SECRET });
    }

    /**
     * Верификация refresh токена
     * @param refreshToken refresh токен
     * @returns payload или проброс exception
     */
    validateRefreshToken(refreshToken: string): IPayloadJWT {
        return this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    }
}
