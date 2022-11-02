import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, Inject, CACHE_MANAGER } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';


import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../pokemon/dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class pokemonService {

  defaultLimit: number;
  constructor( 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache){

     this.defaultLimit = configService.get<number>('defaultLimit');
     
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

  async findAll( paginationDto: PaginationDto) {
     
     try {
      
        const { limit =  this.defaultLimit, offset = 0, search= ''} = paginationDto;
     
        let response ;
        
        if(search !== ''){
         response = this.pokemonModel.find({ "name": { $regex: '.*' + search + '.*' } }).limit(limit).skip(offset).sort({ id:1}).select('-__v').clone();
        }else{
         response = this.pokemonModel.find().limit(limit).skip(offset).sort({ id:1}).select('-__v');
        } 
  
         
        
        return response;
      

     } catch (error) {
      
      throw new BadRequestException(`${error}`)

     }
  
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
      throw new InternalServerErrorException(`No se pudo actualizar el Pokemon - revisar los log del servidor`)
    }
  }

  private async get(name){
    return await this.cacheManager.get(name);
  }
  private async set(key, value){
    return await this.cacheManager.set(key, value);
  }
}
