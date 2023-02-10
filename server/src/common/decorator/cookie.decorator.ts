import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const obj = data ? request.cookies?.[data] : request.cookies;
    if (!obj) throw new BadRequestException(`Cookie '${data}' not found`);
    return obj;
});
