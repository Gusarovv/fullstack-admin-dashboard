import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { AffiliateStat, AffiliateStatSchema } from './schemas/affiliate-stat.schema';
import { OverallStat, OverallStatSchema } from './schemas/overall-stat.schema';
import { ProductStat, ProductStatSchema } from './schemas/product-stat.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Token, TokenSchema } from './schemas/token.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
        MongooseModule.forFeature([
            { name: Token.name, schema: TokenSchema },
            { name: Transaction.name, schema: TransactionSchema },
            { name: User.name, schema: UserSchema },
            { name: AffiliateStat.name, schema: AffiliateStatSchema },
            { name: OverallStat.name, schema: OverallStatSchema },
            { name: ProductStat.name, schema: ProductStatSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [],
    providers: [MongoService],
    exports: [MongooseModule, MongoService],
})
export class MongoModule {}
