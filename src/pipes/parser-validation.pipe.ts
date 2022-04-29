import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { CommandDto } from 'src/interfaces/command-dto.interface';
import { getRepository, In } from 'typeorm';

@Injectable()
export class ParserValidationPipe implements PipeTransform {
  constructor(private entity: Type) {}

  async transform(value: string[], metadata: ArgumentMetadata) {
    const repository = await getRepository(this.entity);
    const mappedCommands = value.map((x) => new CommandDto(x));
    const stations = new Set();
    mappedCommands
      .filter(
        (x) =>
          (x.command == 'Start' || x.command == 'Stop') && !isNaN(x.station),
      )
      .forEach((x) => stations.add(x.station));
    const [list, count] = await repository.findAndCount({
      id: In([...stations]),
    });
    if (count != stations.size)
      throw new BadRequestException('stationIds not valid');
    return mappedCommands;
  }
}
