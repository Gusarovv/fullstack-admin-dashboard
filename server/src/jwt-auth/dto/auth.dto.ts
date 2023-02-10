import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthUserDto {
    @IsString()
    @IsEmail()
    @Length(4, 80)
    @Transform(({ value }) => value.toLowerCase())
    readonly email: string;

    @IsString()
    @Length(4, 60)
    readonly password: string;
}
