import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from '../seed/interfaces/pokemon-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){

  }

async executeSeed(){

  await this.pokemonModel.deleteMany({}) /** Elimina todos lo registros de la BD antes de insertar */

  const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  const pokemonToInsert: { name: string, id:number, url: string}[] = [] ;
  
  data.results.forEach( async ({name, url}) =>{
    
  const segments = url.split('/');
  const no: number = +segments[segments.length -2];

  const pokemon = await this.pokemonModel.create( {name,id:no,url});

    pokemonToInsert.push({name, id:no, url});

  });

  return 'Sedd Executerd';

}

}
