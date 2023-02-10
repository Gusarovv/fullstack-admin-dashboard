import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IPayloadJWT } from '../../jwt-auth/jwt-generate.service';
import { JwtVerifyService } from '../../jwt-auth/jwt-verify.service';
import { ROLE_KEY } from '../decorator/role-auth.decorator';

/**
 * Перекрывает JWT авторизацию
 * Если у пользователя есть хотя бы одна необходимая роль -> доступ разрешён
 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly jwtVerifyService: JwtVerifyService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const bearer = req.headers.authorization?.split(' ')[0];
        const token = req.headers.authorization?.split(' ')[1];
        if (!req.headers.authorization || bearer != 'Bearer' || !token) {
            if (requiredRoles) throw new UnauthorizedException();
            return true;
        }

        let userPayload: IPayloadJWT;
        try {
            userPayload = this.jwtVerifyService.validateAccessToken(token);
        } catch (e) {
            if (requiredRoles) throw new UnauthorizedException();
            return true;
        }

        req.userPayload = userPayload;

        // Если не указаны роли или разрешено даже обычному пользователю
        if (!requiredRoles || requiredRoles.find((role) => role === 'user')) {
            return true;
        }

        if (userPayload.role === 'superadmin') return true;

        if (!requiredRoles.includes(userPayload.role)) throw new ForbiddenException();
        return true;
    }
}
