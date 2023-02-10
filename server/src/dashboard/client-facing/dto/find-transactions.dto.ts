import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindTransactionDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page: number;
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => Number(value))
    pageSize: number;
    @IsString()
    @IsOptional()
    sort: string;
    @IsString()
    @IsOptional()
    search: string;
}
