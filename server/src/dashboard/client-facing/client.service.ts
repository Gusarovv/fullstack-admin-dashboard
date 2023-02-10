import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { getCountryISO3 } from '../../common/utils/country-iso/country-convert';
import { Product, ProductDocument } from '../../mongo/schemas/product.schema';
import { Transaction, TransactionDocument } from '../../mongo/schemas/transaction.schema';
import { User, UserDocument } from '../../mongo/schemas/user.schema';
import { FindTransactionDto } from './dto/find-transactions.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    ) {}

    async findAllProducts() {
        // Получение агрегации продуктов с их статистикой
        const productsWithStats = this.productModel.aggregate([
            { $lookup: { from: 'productstats', localField: '_id', foreignField: 'productId', as: 'stat' } },
            { $unwind: '$stat' },
        ]);
        return productsWithStats;
    }

    async findAllCustomers() {
        const customers = await this.userModel.find({ role: 'user' }).select('-password').lean();
        return customers;
    }

    async findAllTransactions(query: FindTransactionDto) {
        // пример объекта для сортировки (полученный с MUI): { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = '' } = query;

        // отформатированная сортировка будет выглядеть наподобие { userId: -1 }
        const generateSort = () => {
            const sortOrderFormat = ['asc', 'desc'];
            const sortParsed: { field: string; sort: string } = JSON.parse(sort);
            if (!sortParsed.field || !sortParsed.sort || !sortOrderFormat.includes(sortParsed.sort))
                throw new BadRequestException('Incorrect format of sorting parameters');
            const sortFormatted: { [key: string]: SortOrder } = {
                [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) && sort !== '{}' ? generateSort() : {};
        const transactions = await this.transactionModel
            .find({ userId: { $regex: new RegExp(search, 'i') } })
            .sort(sortFormatted)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const total = await this.transactionModel.countDocuments({
            name: { $regex: search, $options: 'i' },
        });

        return {
            transactions,
            total,
        };
    }

    async findAllGeographyUsers() {
        const users = await this.userModel.find().lean();
        const mappedLocations: { [country: string]: number } = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryISO3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});
        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return { id: country, value: count };
        });
        return formattedLocations;
    }
}
