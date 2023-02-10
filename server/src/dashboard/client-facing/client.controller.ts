import { Controller, Get, Query } from '@nestjs/common';
import { Role } from '../../common/decorator/role-auth.decorator';
import { ClientService } from './client.service';
import { FindTransactionDto } from './dto/find-transactions.dto';

@Role('admin')
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get('products')
    findAllProducts() {
        return this.clientService.findAllProducts();
    }

    @Get('customers')
    findAllCustomers() {
        return this.clientService.findAllCustomers();
    }

    @Get('transactions')
    findAllTransactions(@Query() query: FindTransactionDto) {
        return this.clientService.findAllTransactions(query);
    }

    @Get('geography')
    findAllGeographyUsers() {
        return this.clientService.findAllGeographyUsers();
    }
}
