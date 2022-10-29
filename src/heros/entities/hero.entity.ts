import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Powerstats } from "../interface/hero.interface";


@Schema()
export class Hero extends Document {

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
    
    @Prop([String])
    slug:        string;
    
    @Prop([String])
    powerstats:  Powerstats;
    
    @Prop([String])
    image:      string;
}

export const HerosSchema = SchemaFactory.createForClass(Hero);
