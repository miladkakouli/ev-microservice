import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CompanyEntity } from 'src/entities/company.entity';
import { IsExistsInDB } from 'src/validators/is-exists-in-db.validator';
import { IsUniqueInDB } from 'src/validators/is-unique-in-db.validator';

export class CompanyUpdateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsExistsInDB(CompanyEntity)
  id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsUniqueInDB(CompanyEntity)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @IsExistsInDB(CompanyEntity, 'id')
  parent: number;
}
