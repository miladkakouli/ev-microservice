import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/entities/company.entity';
import { CompanyRepository } from 'src/repositories/company.repository';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  getAll() {
    return this.companyRepository.createQueryBuilder().getMany();
  }

  createItem(createItemDto) {
    let c = new CompanyEntity();
    c = { ...createItemDto };
    if (createItemDto.parent) {
      const p = new CompanyEntity();
      p.id = createItemDto.parent;
      c.parent = p;
    }
    return this.companyRepository.save(c);
  }

  updateOrCreateItem(updateOrCreateItemDto) {
    return this.companyRepository.save(updateOrCreateItemDto);
  }

  update(updateDto) {
    return this.companyRepository.save(updateDto);
  }

  getItemById(id: number) {
    return this.companyRepository.findOne(id);
  }

  getStationsById(id: number) {
    return this.companyRepository.getStationsById(id);
  }

  deleteItemById(id: number) {
    return this.companyRepository.softDelete(id);
  }
}
