import { Module } from '@nestjs/common';
import { HerosService } from './heros.service';
import { HerosController } from './heros.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HerosSchema } from './entities/hero.entity';

@Module({
  controllers: [HerosController],
  providers: [HerosService],
  imports: [ 
    MongooseModule.forFeature([{
      name: Hero.name,
      schema: HerosSchema
    }])
  ]
})
export class HerosModule {}
