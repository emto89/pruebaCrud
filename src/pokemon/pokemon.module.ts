import { Module } from '@nestjs/common';
import { pokemonService } from './pokemon.service';
import { pokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [pokemonController],
  providers: [pokemonService],
  imports: [ 
    MongooseModule.forFeature([{
      name: Pokemon.name,
      schema: pokemonSchema
    }])
  ],
  exports:[
    MongooseModule
  ]
})
export class pokemonModule {}
