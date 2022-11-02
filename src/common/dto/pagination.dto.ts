import { IsOptional, IsPositive, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @Min(1)
    @ApiProperty({ default: 10, description: 'Cantidad de filas que se necesitan', nullable: true})
    limit?: number;

    @IsOptional()
    @IsPositive()
    @ApiProperty({ default: 5, description: 'Cuantas filas se realizara el salto', nullable: true})
    offset?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ default: 'Picaku', description: 'nombre del pokemon a buscar', nullable: true})
    search?: string;






}