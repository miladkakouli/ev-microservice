import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StationEntity } from 'src/entities/station.entity';
import { StationCreateDto } from 'src/interfaces/station-create-dto.interface';
import { StationCreateOrUpdateDto } from 'src/interfaces/station-create-or-update-dto.interface';
import { StationUpdateDto } from 'src/interfaces/station-update-dto.interface';
import { ShouldExistInDbValidationPipe } from 'src/pipes/shoould-exists-in-db-validation.pipe';
import { StationService } from 'src/services/station.service';

@Controller()
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @MessagePattern({ role: 'stationItem', cmd: 'all' })
  getAll() {
    return this.stationService.getAll();
  }

  @MessagePattern({ role: 'stationItem', cmd: 'create' })
  create(dto: StationCreateDto) {
    return this.stationService.createItem(dto);
  }

  @MessagePattern({ role: 'stationItem', cmd: 'update-or-create' })
  updateOrCreateItem(updateOrCreateItemDto: StationCreateOrUpdateDto) {
    return this.stationService.updateOrCreateItem(updateOrCreateItemDto);
  }

  @MessagePattern({ role: 'stationItem', cmd: 'update' })
  update(updateDto: StationUpdateDto) {
    return this.stationService.update(updateDto);
  }

  @MessagePattern({ role: 'stationItem', cmd: 'get-by-id' })
  getItemById(
    @Payload(new ShouldExistInDbValidationPipe(StationEntity), ParseIntPipe)
    id: number,
  ) {
    return this.stationService.getItemById(id);
  }

  @MessagePattern({ role: 'stationItem', cmd: 'delete-by-id' })
  deleteItemById(
    @Payload(new ShouldExistInDbValidationPipe(StationEntity), ParseIntPipe)
    id: number,
  ) {
    return this.stationService.deleteItemById(id);
  }
}
