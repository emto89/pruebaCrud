import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/Pokemon.entity';

import { CreatePokemonDto } from './dto/create-Pokemon.dto';
import { UpdatePokemonDto } from './dto/update-Pokemon.dto';


@Injectable()
export class pokemonService {

  constructor( 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>){

  }
  

  async create(createPokemonDto: CreatePokemonDto) {
  
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    
     try {
      
      const Pokemon = await this.pokemonModel.create( createPokemonDto );

      return Pokemon;

     } catch (error) {

        this.handleExceptions(error);

     }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let Pokemon: Pokemon;
    /** Valida si es un numero y lo es consulta por el ID */
    if(!isNaN(+term)){
      Pokemon = await this.pokemonModel.findOne({id: term});
    }
    /** Validacion con MongoID Y Busqueda por MongoID en BD*/
    if ( !Pokemon && isValidObjectId(term)){
      Pokemon = await this.pokemonModel.findById(term)
    }
    /** Busca por nombre del Pokemone */
    if( !Pokemon ){
     Pokemon = await this.pokemonModel.findOne( {name: term.toLocaleLowerCase().trim()} )
    }

    if( !Pokemon) throw new NotFoundException(`Pokemone busqueda por Id, Nombre o Slug ${term} no fue encontrado`);
    return Pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const Pokemon = await this.findOne(term);
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
  
      try {
        await Pokemon.updateOne(updatePokemonDto, { new: true});
    
        return {...Pokemon.toJSON(), ...updatePokemonDto};
      } catch (error) {

        this.handleExceptions(error);
           
        
      }
    
  }

 async remove(id: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id}); //await this.pokemonModel.findByIdAndDelete(id);
    if( deletedCount === 0){
       throw new BadRequestException(`Pokemone con el id "${id}" no encontrado`)
    }

    return ;
  }

  private handleExceptions( error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemone ya existe en la bd ${JSON.stringify(error.keyValue)}`)
    }else{
      throw new InternalServerErrorException(`No se pudo actualizar el Pokemone - revisar los log del servidor`)
    }
  }
}
