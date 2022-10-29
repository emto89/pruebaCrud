import { IsArray, IsInt, IsJSON, IsPositive, IsString, IsUrl, Min, MinLength } from "class-validator";

export class CreateHeroDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    id: number;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    slug: string;

    @IsJSON()
    powerstats: JSON;

    @IsUrl()
    image: string;
}
