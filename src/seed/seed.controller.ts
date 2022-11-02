import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';


@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiResponse({ status: 201, description: 'Se carga la lista de pokemon y se almacena en la base de datos interna'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  executeSEED() {
    return this.seedService.executeSeed();
  }

}
