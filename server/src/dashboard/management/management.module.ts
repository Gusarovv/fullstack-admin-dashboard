import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../../jwt-auth/jwt-auth.module';
import { MongoModule } from '../../mongo/mongo.module';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';

@Module({
    imports: [JwtAuthModule, MongoModule],
    controllers: [ManagementController],
    providers: [ManagementService],
})
export class ManagementModule {}
