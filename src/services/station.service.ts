import { Injectable } from '@nestjs/common';
import { StationRepository } from 'src/repositories/station.repository';

@Injectable()
export class StationService {
  constructor(private stationRepository: StationRepository) {}

  getAll() {
    return this.stationRepository.createQueryBuilder().getMany();
  }

  createItem(createItemDto) {
    return this.stationRepository.save(createItemDto);
  }

  updateOrCreateItem(updateOrCreateItemDto) {
    return this.stationRepository.save(updateOrCreateItemDto);
  }

  update(updateDto) {
    return this.stationRepository.save(updateDto);
  }

  getItemById(id: number) {
    return this.stationRepository.findOne(id);
  }

  deleteItemById(id: number) {
    return this.stationRepository.softDelete(id);
  }
}
