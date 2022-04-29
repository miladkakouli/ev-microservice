import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CompanyEntity } from 'src/entities/company.entity';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { StationEntity } from 'src/entities/station.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class StationCreateDto {
  @IsNotEmpty()
  @IsUniqueInDB(StationEntity)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsExistsInDB(StationTypeEntity, 'id')
  stationType: number;

  @IsNumber()
  @IsPositive()
  @IsExistsInDB(CompanyEntity, 'id')
  company: number;
}
