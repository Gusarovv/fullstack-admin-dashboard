import { Controller, Get, Request } from '@nestjs/common';
import { Role } from '../../common/decorator/role-auth.decorator';
import { IPayloadJWT } from '../../jwt-auth/jwt-generate.service';
import { ManagementService } from './management.service';

@Role('admin')
@Controller('management')
export class ManagementController {
    constructor(private readonly managementService: ManagementService) {}

    @Get('admins')
    findAllCustomers() {
        return this.managementService.findAllAdmins();
    }

    @Get('performance/@me')
    findMyPerformance(@Request() req: { userPayload: IPayloadJWT }) {
        return this.managementService.findAdminPerformance(req.userPayload._id);
    }
}
