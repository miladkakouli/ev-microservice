import { Injectable } from '@nestjs/common';
import { StationTypeRepository } from '../repositories/station-type.repository';

@Injectable()
export class StationTypeService {
  constructor(private stationTypeRepository: StationTypeRepository) {}

  getAll() {
    return this.stationTypeRepository.createQueryBuilder().getMany();
  }

  createItem(createItemDto) {
    return this.stationTypeRepository.save(createItemDto);
  }

  updateOrCreateItem(updateOrCreateItemDto) {
    return this.stationTypeRepository.save(updateOrCreateItemDto);
  }

  update(updateDto) {
    return this.stationTypeRepository.save(updateDto);
  }

  getItemById(id: number) {
    return this.stationTypeRepository.findOne(id);
  }

  deleteItemById(id: number) {
    return this.stationTypeRepository.softDelete(id);
  }
}
