import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './common/guard/role-auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [MongoModule, JwtAuthModule, UserModule, DashboardModule],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RoleGuard,
        },
        RoleGuard,
    ],
})
export class AppModule {}
