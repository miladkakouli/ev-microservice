import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CompanyController } from './controllers/company.controller';
import { ParserController } from './controllers/parser.controller';
import { StationTypeController } from './controllers/station-type.controller';
import { StationController } from './controllers/station.controller';
import { TypeOrmConfigFactory } from './factories/type-orm-config.factory';
import { CompanyRepository } from './repositories/company.repository';
import { StationTypeRepository } from './repositories/station-type.repository';
import { StationRepository } from './repositories/station.repository';
import { CompanyService } from './services/company.service';
import { ParserService } from './services/parser.service';
import { StationTypeService } from './services/station-type.service';
import { StationService } from './services/station.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: (process.env.Environment || '') + '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        DB_TYPE: Joi.string()
          .valid(
            'mysql',
            'mariadb',
            'postgres',
            'cockroachdb',
            'sqlite',
            'mssql',
            'oracle',
            'cordova',
            'nativescript',
            'react-native',
            'sqljs',
            'mongodb',
            'expo',
          )
          .default('mysql'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().port().default(3600),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().default('1234'),
        DB_NAME: Joi.string().default('assignment'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forFeature([
      StationTypeRepository,
      StationRepository,
      CompanyRepository,
    ]),
  ],
  controllers: [
    StationTypeController,
    StationController,
    CompanyController,
    ParserController,
  ],
  providers: [
    StationTypeService,
    StationService,
    CompanyService,
    ParserService,
  ],
})
export class AppModule {}
