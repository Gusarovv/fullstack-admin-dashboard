import {
    ArgumentMetadata,
    BadRequestException,
    HttpStatus,
    Injectable,
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj, { forbidNonWhitelisted: true, transform: true, whitelist: true });

        if (errors.length) {
            /**
             * @props property - название поля в котором ошибка
             * @props constraints - сами ошибки в объектах (Пример: {isLength: 'Некорректная длина'})
             */
            const messages = errors.map((err) => {
                if (err.constraints.whitelistValidation)
                    err.constraints.whitelistValidation = 'The field should not exist';
                return {
                    property: err.property,
                    errors: [...Object.values(err.constraints)],
                };
            });
            throw new BadRequestException({
                status: HttpStatus.BAD_REQUEST,
                message: messages,
            });
        }

        return obj;
    }
}
