import { StationTypeEntity } from 'src/entities/station-type.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StationTypeEntity)
export class StationTypeRepository extends Repository<StationTypeEntity> {}
