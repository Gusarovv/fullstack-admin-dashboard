import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
	AffiliateStat,
	AffiliateStatDocument,
	IAffiliateStat
} from '../../mongo/schemas/affiliate-stat.schema';
import { Transaction, TransactionDocument } from '../../mongo/schemas/transaction.schema';
import { User, UserDocument } from '../../mongo/schemas/user.schema';

@Injectable()
export class ManagementService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(AffiliateStat.name) private affiliateStatModel: Model<AffiliateStatDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    ) {}

    async findAllAdmins() {
        const admins = await this.userModel
            .find({ role: { $in: ['admin', 'superadmin'] } })
            .select('-password')
            .lean();
        return admins;
    }

    async findAdminPerformance(adminId: string) {
        const adminPerformance: User & { affiliateStats: IAffiliateStat } = [
            ...(await this.userModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(adminId) } },
                {
                    $lookup: {
                        from: 'affiliatestats',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'affiliateStats',
                    },
                },
                { $unwind: { path: '$affiliateStats' } },
            ])),
        ][0];

        if (!adminPerformance) {
            throw new NotFoundException();
        }

        const saleTransactions = await Promise.all(
            adminPerformance.affiliateStats.affiliateSales.map((id: string) => {
                return this.transactionModel.findById(id);
            }),
        );
        const filteredSaleTransactions = saleTransactions.filter((transaction) => transaction !== null);
        return { user: adminPerformance, sales: filteredSaleTransactions };
    }
}
