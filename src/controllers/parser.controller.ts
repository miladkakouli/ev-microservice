import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StationEntity } from 'src/entities/station.entity';
import { CommandDto } from 'src/interfaces/command-dto.interface';
import { ParserValidationPipe } from 'src/pipes/parser-validation.pipe';
import { ParserService } from 'src/services/parser.service';

@Controller()
export class ParserController {
  constructor(private parserService: ParserService) {}

  @UsePipes(new ParserValidationPipe(StationEntity))
  @MessagePattern({ role: 'commandItem', cmd: 'calculate' })
  async start(commands: CommandDto[]) {
    return await this.parserService.calculate(commands);
  }
}
