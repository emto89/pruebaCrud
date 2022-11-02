import { join } from 'path';
import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule }  from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { pokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
       load: [EnvConfiguration],
       validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    CacheModule.register({
      host: 'localhost',
      port: 6379
    }),
    MongooseModule.forRoot( process.env.MONGODB),
    CacheModule.register({ isGlobal: true}),
    pokemonModule,
    CommonModule,
    SeedModule,
    
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor}],
})
export class AppModule {}
