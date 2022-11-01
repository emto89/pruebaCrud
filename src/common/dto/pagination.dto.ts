import { IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    offset?: number;

    @IsOptional()
    @IsString()
    search?: string;






}