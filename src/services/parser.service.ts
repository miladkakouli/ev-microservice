import { Injectable } from '@nestjs/common';
import { CommandDto } from 'src/interfaces/command-dto.interface';
import { CompanyRepository } from 'src/repositories/company.repository';
import { StationRepository } from 'src/repositories/station.repository';

@Injectable()
export class ParserService {
  constructor(
    private stationRepository: StationRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async calculate(commands: CommandDto[]) {
    let wait = 0;
    let time = new Date();
    const response = [];
    for (const { command, station, fullcommand } of commands) {
      if (command == 'Wait') {
        wait += station;
        continue;
      } else if (command == 'Start' || command == 'Stop') {
        if (!isNaN(station)) {
          const stationEntity = await this.stationRepository.findOne(station, {
            relations: ['company'],
          });
          if (command == 'Start') stationEntity.start();
          else stationEntity.stop();
          await this.stationRepository.save(stationEntity);
        } else {
          if (command == 'Start') await this.stationRepository.startAll();
          else await this.stationRepository.stopAll();
        }
      }
      response.push({
        step: fullcommand,
        timestamp: new Date(time.getTime() + wait * 1000),
        companies: await this.companyRepository.getParentCompanies(),
        totalChargingStations:
          await this.stationRepository.getTotalChargingStations(),
        ...(await this.stationRepository.getTotalChargingPower()),
      });
      if (command == 'Begin' || command == 'End') time = new Date();
    }
    return response;
  }
}
