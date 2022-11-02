import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    @ApiProperty({ default: 651, description: 'este valor es unico por pokemon', nullable: false})
    id: number;

    @IsString()
    @MinLength(1)
    @ApiProperty({ default: 'Picaku', description: 'este es el nombre del pokemon', nullable: false })
    name: string;

    @IsString()
    @ApiProperty({ default: 'https://pokeapi.co/api/v2/pokemon/1/', description: 'este es el nombre del pokemon'})
    url: string;

}
