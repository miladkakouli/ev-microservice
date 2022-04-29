import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class StationTypeUpdateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsExistsInDB(StationTypeEntity)
  id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsUniqueInDB(StationTypeEntity)
  name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  maxPower: number;
}
