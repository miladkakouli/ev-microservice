import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyEntity } from 'src/entities/company.entity';
import { CompanyCreateDto } from 'src/interfaces/company-create-dto.interface';
import { CompanyCreateOrUpdateDto } from 'src/interfaces/company-create-or-update-dto.interface';
import { CompanyUpdateDto } from 'src/interfaces/company-update-dto.interface';
import { ShouldExistInDbValidationPipe } from 'src/pipes/shoould-exists-in-db-validation.pipe';
import { CompanyService } from 'src/services/company.service';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern({ role: 'companyItem', cmd: 'all' })
  getAll() {
    return this.companyService.getAll();
  }

  @MessagePattern({ role: 'companyItem', cmd: 'create' })
  create(dto: CompanyCreateDto) {
    return this.companyService.createItem(dto);
  }

  @MessagePattern({ role: 'companyItem', cmd: 'update-or-create' })
  updateOrCreateItem(updateOrCreateItemDto: CompanyCreateOrUpdateDto) {
    return this.companyService.updateOrCreateItem(updateOrCreateItemDto);
  }

  @MessagePattern({ role: 'companyItem', cmd: 'update' })
  update(updateDto: CompanyUpdateDto) {
    return this.companyService.update(updateDto);
  }

  @MessagePattern({ role: 'companyItem', cmd: 'get-by-id' })
  getItemById(
    @Payload(new ShouldExistInDbValidationPipe(CompanyEntity), ParseIntPipe)
    id: number,
  ) {
    return this.companyService.getItemById(id);
  }

  @MessagePattern({ role: 'companyItem', cmd: 'get-stations-by-id' })
  getStationsById(
    @Payload(new ShouldExistInDbValidationPipe(CompanyEntity), ParseIntPipe)
    id: number,
  ) {
    return this.companyService.getStationsById(id);
  }

  @MessagePattern({ role: 'companyItem', cmd: 'delete-by-id' })
  deleteItemById(@Payload(new ParseIntPipe()) id: number) {
    return this.companyService.deleteItemById(id);
  }
}
