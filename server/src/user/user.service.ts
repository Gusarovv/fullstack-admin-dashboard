import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../mongo/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOneById(id: string) {
        const user = await this.userModel.findById(id).select('-password').lean();
        if (!user) throw new NotFoundException();
        return user;
    }

    async findUserTransactions(userId: string) {
        const user = await this.userModel.findById(userId).lean();
        if (!user) throw new NotFoundException();
        return user.transactions;
    }
}
