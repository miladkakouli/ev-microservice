import { StationEntity } from 'src/entities/station.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StationEntity)
export class StationRepository extends Repository<StationEntity> {
  async startAll() {
    await this.createQueryBuilder('station')
      .update()
      .set({ isCharging: true })
      .execute();
  }

  async stopAll() {
    await this.createQueryBuilder('station')
      .update()
      .set({ isCharging: false })
      .execute();
  }

  async getTotalChargingStations() {
    return (
      await this.createQueryBuilder('station')
        .where('station.isCharging = :isCharging', { isCharging: true })
        .select('station.id', 'id')
        .getRawMany()
    ).map((x) => x.id);
  }

  async getTotalChargingPower() {
    return await this.createQueryBuilder('station')
      .innerJoin('station.stationType', 'stationType')
      .where('station.isCharging = :isCharging', { isCharging: true })
      .select('sum(stationType.maxPower)', 'totalChargingPower')
      .getRawOne();
  }
}
