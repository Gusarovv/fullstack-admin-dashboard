import { Module } from '@nestjs/common';
import { ClientModule } from './client-facing/client.module';
import { ManagementModule } from './management/management.module';
import { SalesModule } from './sales/sales.module';

@Module({
    imports: [ClientModule, ManagementModule, SalesModule],
})
export class DashboardModule {}
