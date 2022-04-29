import { CompanyEntity } from 'src/entities/company.entity';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { StationEntity } from 'src/entities/station.entity';
import { EntityRepository, TreeRepository } from 'typeorm';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends TreeRepository<CompanyEntity> {
  async getParentCompanies(): Promise<any> {
    const s = this.createAncestorsQueryBuilder('company', 'closure', null)
      .innerJoinAndMapMany(
        'company.descendantStations',
        (qb) =>
          qb
            .select('innerStation.id', 'id')
            .addSelect('innerStation.isCharging', 'isCharging')
            .addSelect('innerStation.companyId', 'companyId')
            .addSelect('innerStation.stationTypeId', 'stationTypeId')
            .from(StationEntity, 'innerStation')
            .where('innerStation.isCharging = :isCharging', {
              isCharging: true,
            }),
        'station',
        'station.companyId= closure.id_descendant',
      )
      .innerJoinAndMapOne(
        'station.maxPower',
        (qb) =>
          qb
            .select('innerStationType.id', 'id')
            .addSelect('innerStationType.maxPower', 'maxPower')
            .from(StationTypeEntity, 'innerStationType'),
        'stationType',
        'station.stationTypeId = stationType.id',
      )
      .select('company.id', 'id')
      .addSelect('group_concat(station.id)', 'chargingStations')
      .addSelect('sum(stationType.maxPower)', 'chargingPower')
      .where('1=1')
      .groupBy('company.id');

    console.log(s.getSql());
    return (await s.getRawMany()).map((x) => {
      return { ...x, chargingStations: x.chargingStations.split(',') };
    });
  }

  async getStationsById(id: number) {
    const entity = await this.findOne(id);

    const s = await this.createDescendantsQueryBuilder(
      'company',
      'closure',
      entity,
    )
      .innerJoin('company.stations', 'station')
      .innerJoin('station.stationType', 'stationType')
      .select('station.id', 'stationId')
      .addSelect('station.name', 'stationName')
      .addSelect('stationType.maxPower', 'stationMaxPower')
      .getRawMany();

    return s;
  }
}
