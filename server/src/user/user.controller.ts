import { Controller, Get, Param, Request } from '@nestjs/common';
import { Role } from '../common/decorator/role-auth.decorator';
import { IPayloadJWT } from '../jwt-auth/jwt-generate.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('@me')
    @Role('user')
    findUserMe(@Request() req: { userPayload: IPayloadJWT }) {
        return this.userService.findOneById(req.userPayload._id);
    }

    @Get('transactions/@me')
    @Role('user')
    findTransactionsMe(@Request() req: { userPayload: IPayloadJWT }) {
        return this.userService.findUserTransactions(req.userPayload._id);
    }

    @Get('transactions/:id')
    @Role('admin')
    findTransactionsUser(@Param('id') id: string) {
        return this.userService.findUserTransactions(id);
    }
}
