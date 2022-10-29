import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HerosService } from './heros.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';


@Controller('heros')
export class HerosController {
  constructor(private readonly herosService: HerosService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.herosService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.herosService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.herosService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateHeroDto: UpdateHeroDto) {
  
    return this.herosService.update(term, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.herosService.remove(id);
  }
}
