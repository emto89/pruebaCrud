import { Module } from '@nestjs/common';
import { SeedService } from '../seed/seed.service';
import { SeedController } from '../seed/seed.controller';
import { pokemonModule } from '../pokemon/pokemon.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[pokemonModule, CommonModule]
})
export class SeedModule {}
