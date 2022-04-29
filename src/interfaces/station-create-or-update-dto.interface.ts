import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { CompanyEntity } from 'src/entities/company.entity';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { StationEntity } from 'src/entities/station.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class StationCreateOrUpdateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @IsExistsInDB(StationEntity)
  id: number;

  @ValidateIf((o) => o.id == null)
  @IsNotEmpty()
  @IsUniqueInDB(StationEntity)
  name: string;

  @ValidateIf((o) => o.id == null)
  @IsNumber()
  @IsPositive()
  @IsExistsInDB(StationTypeEntity, 'id')
  stationType: number;

  @ValidateIf((o) => o.id == null)
  @IsNumber()
  @IsPositive()
  @IsExistsInDB(CompanyEntity, 'id')
  company: number;
}
