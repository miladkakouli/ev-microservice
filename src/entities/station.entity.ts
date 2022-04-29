import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { StationTypeEntity } from './station-type.entity';

@Entity('stations')
export class StationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne((type) => CompanyEntity, (c) => c.stations, {
    nullable: false,
  })
  company: CompanyEntity;

  @ManyToOne((type) => StationTypeEntity, {
    nullable: false,
  })
  stationType: StationTypeEntity;

  @Column({
    nullable: false,
    default: false,
  })
  isCharging: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    select: false,
  })
  deletedAt?: Date;

  @VersionColumn({
    select: false,
  })
  version: number;

  start() {
    this.isCharging = true;
  }

  stop() {
    this.isCharging = false;
  }
}
