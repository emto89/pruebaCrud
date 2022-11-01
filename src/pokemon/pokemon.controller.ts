import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { pokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { query } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class pokemonController {
  constructor(private readonly pokemonService: pokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.pokemonService.findAll(paginationDto);
  }
  
  @UseInterceptors(CacheInterceptor)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
  
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
