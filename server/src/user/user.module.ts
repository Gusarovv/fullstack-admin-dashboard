import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongoModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
