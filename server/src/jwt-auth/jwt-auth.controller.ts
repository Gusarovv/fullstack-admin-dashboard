import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from '../common/decorator/cookie.decorator';
import { AuthUserDto } from './dto/auth.dto';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth')
export class JwtAuthController {
    constructor(private readonly jwtAuthService: JwtAuthService) {}

    @Post('login')
    async login(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) response: Response) {
        const tokens = await this.jwtAuthService.login(authUserDto);
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        });
        return { accessToken: tokens.accessToken };
    }

    @Post('logout')
    async logout(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.jwtAuthService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return { message: 'success' };
    }

    @Post('refresh')
    async refresh(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userData = await this.jwtAuthService.refresh(refreshToken);
        response.cookie('refreshToken', userData.refreshToken, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return { accessToken: userData.accessToken };
    }
}
