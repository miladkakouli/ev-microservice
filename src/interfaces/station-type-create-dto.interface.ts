import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class StationTypeCreateDto {
  @IsNotEmpty()
  @IsUniqueInDB(StationTypeEntity)
  name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  maxPower: number;
}
