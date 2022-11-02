import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';



@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true
    })
    @ApiProperty({ example: 1 , description:' Id interno de los pokemon', uniqueItems: true})
    id:          number;
    
    @Prop({
        unique: true,
        index: true
    })
    @ApiProperty({ example: 'Picaku' , description:' Nombre del pokemon creado', uniqueItems: true})
    name:        string;
    @Prop({    })
    @ApiProperty({ example: 'https://pokeapi.co/api/v2/pokemon/1/' , description:'Url donde se encuentra la inforacion del pokemon', uniqueItems: true})
    url:        string;
    
}

export const pokemonSchema = SchemaFactory.createForClass(Pokemon);
