import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { CompanyEntity } from 'src/entities/company.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class CompanyCreateOrUpdateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @IsExistsInDB(CompanyEntity)
  id: number;

  @ValidateIf((o) => o.id == null)
  @IsNotEmpty()
  @IsUniqueInDB(CompanyEntity)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @IsExistsInDB(CompanyEntity, 'id')
  parent: number;
}
