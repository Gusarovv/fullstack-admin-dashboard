import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from '../mongo/mongo.module';
import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';
import { JwtGenerateService } from './jwt-generate.service';
import { JwtVerifyService } from './jwt-verify.service';

@Module({
    imports: [MongoModule, JwtModule.register({})],
    controllers: [JwtAuthController],
    providers: [JwtAuthService, JwtGenerateService, JwtVerifyService],
    exports: [JwtVerifyService],
})
export class JwtAuthModule {}
