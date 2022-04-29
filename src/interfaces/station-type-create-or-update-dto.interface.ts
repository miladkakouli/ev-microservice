import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class StationTypeCreateOrUpdateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @IsExistsInDB(StationTypeEntity)
  id: number;

  @ValidateIf((o) => o.id == null)
  @IsNotEmpty()
  @IsUniqueInDB(StationTypeEntity)
  name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  maxPower: number;
}
