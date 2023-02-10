import { applyDecorators, SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

/**
 * Указывается список ролей, которым дается доступ
 */
export const Role = (...role: string[]) => applyDecorators(SetMetadata(ROLE_KEY, role));
