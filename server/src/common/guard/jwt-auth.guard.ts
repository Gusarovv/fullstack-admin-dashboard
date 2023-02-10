import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtVerifyService } from '../../jwt-auth/jwt-verify.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtVerifyService: JwtVerifyService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        Logger.log('JwtAuthGuard', JwtAuthGuard.name);
        try {
            if (!req.headers.authorization) throw new UnauthorizedException();

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer != 'Bearer' || !token) {
                throw new UnauthorizedException();
            }

            const userPayload = this.jwtVerifyService.validateAccessToken(token);
            if (!userPayload) throw new UnauthorizedException();

            req.userPayload = userPayload;

            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
