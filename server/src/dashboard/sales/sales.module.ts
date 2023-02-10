import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../../jwt-auth/jwt-auth.module';
import { MongoModule } from '../../mongo/mongo.module';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
    imports: [JwtAuthModule, MongoModule],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule {}
