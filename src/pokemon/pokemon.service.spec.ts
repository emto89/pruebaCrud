import { Test, TestingModule } from '@nestjs/testing';
import { pokemonService } from './pokemon.service';

describe('pokemonService', () => {
  let service: pokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [pokemonService],
    }).compile();

    service = module.get<pokemonService>(pokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
