import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { getRepository } from 'typeorm';

@Injectable()
export class ShouldExistInDbValidationPipe implements PipeTransform {
  constructor(private entity: Type) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const exists = await getRepository(this.entity).findOne({
      where: {
        id: value,
      },
    });
    if (exists) return value;
    throw new NotFoundException();
  }
}
s;
