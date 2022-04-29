import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DB_TYPE'),
      url: `${this.configService.get('DB_TYPE')}://${this.configService.get(
        'DB_USERNAME',
      )}:${this.configService.get('DB_PASSWORD')}@${this.configService.get(
        'DB_HOST',
      )}:${this.configService.get('DB_PORT')}/${this.configService.get(
        'DB_NAME',
      )}`,
      entities: [join(__dirname, '../**/entities/**.entity{.ts,.js}')],
      synchronize: true,
    };
  }
}
