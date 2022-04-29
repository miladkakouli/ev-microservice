import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { StationEntity } from './station.entity';

@Entity('companies')
@Tree('closure-table')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany((type) => StationEntity, (s) => s.company, {
    nullable: false,
  })
  stations: StationEntity[];

  @TreeChildren()
  children: CompanyEntity[];

  @TreeParent()
  parent: CompanyEntity;

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
}
