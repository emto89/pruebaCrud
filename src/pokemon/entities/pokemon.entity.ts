import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true
    })
    id:          number;
    
    @Prop({
        unique: true,
        index: true
    })
    name:        string;
}

export const pokemonSchema = SchemaFactory.createForClass(Pokemon);
