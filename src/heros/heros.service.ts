import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Hero } from './entities/hero.entity';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';


@Injectable()
export class HerosService {

  constructor( 
    @InjectModel(Hero.name)
    private readonly herosModel: Model<Hero>){

  }
  

  async create(createHeroDto: CreateHeroDto) {
  
    createHeroDto.name = createHeroDto.name.toLocaleLowerCase();
    createHeroDto.slug = createHeroDto.slug.toLocaleLowerCase();
    
     try {
      
      const hero = await this.herosModel.create( createHeroDto );

      return hero;

     } catch (error) {

        this.handleExceptions(error);

     }

  }

  findAll() {
    return `This action returns all heros`;
  }

  async findOne(term: string) {

    let hero: Hero;
    /** Valida si es un numero y lo es consulta por el ID */
    if(!isNaN(+term)){
      hero = await this.herosModel.findOne({id: term});
    }
    /** Validacion con MongoID Y Busqueda por MongoID en BD*/
    if ( !hero && isValidObjectId(term)){
      hero = await this.herosModel.findById(term)
    }
    /** Busca por nombre del heroe */
    if( !hero ){
     hero = await this.herosModel.findOne( {name: term.toLocaleLowerCase().trim()} )
    }

    if( !hero) throw new NotFoundException(`Heroe busqueda por Id, Nombre o Slug ${term} no fue encontrado`);
    return hero;
  }

  async update(term: string, updateHeroDto: UpdateHeroDto) {

    const hero = await this.findOne(term);
    if(updateHeroDto.name)
      updateHeroDto.name = updateHeroDto.name.toLocaleLowerCase();
  
      try {
        await hero.updateOne(updateHeroDto, { new: true});
    
        return {...hero.toJSON(), ...updateHeroDto};
      } catch (error) {

        this.handleExceptions(error);
           
        
      }
    
  }

 async remove(id: string) {

    const { deletedCount } = await this.herosModel.deleteOne({ _id: id}); //await this.herosModel.findByIdAndDelete(id);
    if( deletedCount === 0){
       throw new BadRequestException(`Heroe con el id "${id}" no encontrado`)
    }

    return ;
  }

  private handleExceptions( error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Heroe ya existe en la bd ${JSON.stringify(error.keyValue)}`)
    }else{
      throw new InternalServerErrorException(`No se pudo actualizar el heroe - revisar los log del servidor`)
    }
  }
}
