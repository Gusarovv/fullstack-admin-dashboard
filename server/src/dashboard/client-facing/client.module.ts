import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../../jwt-auth/jwt-auth.module';
import { MongoModule } from '../../mongo/mongo.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [JwtAuthModule, MongoModule],
    controllers: [ClientController],
    providers: [ClientService],
})
export class ClientModule {}
