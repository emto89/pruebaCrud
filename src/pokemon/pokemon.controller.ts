import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { pokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Pokemon } from './entities/pokemon.entity';
import { CacheKey } from '@nestjs/common';


@ApiTags('Pokemon')
@Controller('pokemon')
export class pokemonController {
  constructor(
    private readonly pokemonService: pokemonService,
    ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Pokemon fue creado', type: Pokemon})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  @ApiResponse({ status: 201, description: 'Se obtienen todos los pokemon', type: Pokemon})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @CacheKey('consultaPokemons')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.pokemonService.findAll(paginationDto);
  }
  
  @UseInterceptors(CacheInterceptor)
  @Get(':term')
  @ApiResponse({ status: 201, description: 'Se obtiene un pokemon por un termino de busqueda', type: Pokemon})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @CacheKey('consultaPokemon')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  @ApiResponse({ status: 201, description: 'Se actualiza un pokemon', type: Pokemon})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
  
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'Se elimina el pokemon', type: Pokemon})
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
