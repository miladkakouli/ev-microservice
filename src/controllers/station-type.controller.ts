import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StationTypeEntity } from 'src/entities/station-type.entity';
import { StationTypeCreateDto } from 'src/interfaces/station-type-create-dto.interface';
import { StationTypeCreateOrUpdateDto } from 'src/interfaces/station-type-create-or-update-dto.interface';
import { StationTypeUpdateDto } from 'src/interfaces/station-type-update-dto.interface';
import { ShouldExistInDbValidationPipe } from 'src/pipes/shoould-exists-in-db-validation.pipe';
import { StationTypeService } from '../services/station-type.service';

@Controller()
export class StationTypeController {
  constructor(private readonly stationTypeService: StationTypeService) {}

  @MessagePattern({ role: 'stationTypeItem', cmd: 'all' })
  getAll() {
    return this.stationTypeService.getAll();
  }

  @MessagePattern({ role: 'stationTypeItem', cmd: 'create' })
  create(dto: StationTypeCreateDto) {
    return this.stationTypeService.createItem(dto);
  }

  @MessagePattern({ role: 'stationTypeItem', cmd: 'update-or-create' })
  updateOrCreateItem(updateOrCreateItemDto: StationTypeCreateOrUpdateDto) {
    return this.stationTypeService.updateOrCreateItem(updateOrCreateItemDto);
  }

  @MessagePattern({ role: 'stationTypeItem', cmd: 'update' })
  update(updateDto: StationTypeUpdateDto) {
    return this.stationTypeService.update(updateDto);
  }

  @MessagePattern({ role: 'stationTypeItem', cmd: 'get-by-id' })
  getItemById(
    @Payload(new ShouldExistInDbValidationPipe(StationTypeEntity), ParseIntPipe)
    id: number,
  ) {
    return this.stationTypeService.getItemById(id);
  }

  @MessagePattern({ role: 'stationTypeItem', cmd: 'delete-by-id' })
  deleteItemById(
    @Payload(new ShouldExistInDbValidationPipe(StationTypeEntity), ParseIntPipe)
    id: number,
  ) {
    return this.stationTypeService.deleteItemById(id);
  }
}
