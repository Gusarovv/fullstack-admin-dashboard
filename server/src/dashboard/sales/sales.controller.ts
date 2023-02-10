import { Controller, Get } from '@nestjs/common';
import { Role } from '../../common/decorator/role-auth.decorator';
import { SalesService } from './sales.service';

@Role('admin')
@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Get('overall-stats')
    findAllProducts() {
        return this.salesService.findOverallStats();
    }

    @Get('today-total-stats')
    findTodayAndTotalStats() {
        return this.salesService.findTodayAndTotalStats();
    }
}
