import { Test, TestingModule } from '@nestjs/testing';
import { pokemonController } from './pokemon.controller';
import { pokemonService } from './pokemon.service';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

describe('pokemonController', () => {
  let controller: pokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [pokemonController],
      providers: [pokemonService],
    }).compile();

    controller = module.get<pokemonController>(pokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
