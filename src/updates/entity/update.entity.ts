import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('update')
export class UpdateEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  filename: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  url: string;

  @AutoMap()
  @Column({
    type: 'bigint',
    nullable: false,
  })
  timestamp: number;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  version: string;

  @AutoMap()
  @Column({
    type: 'bigint',
    nullable: false,
  })
  size: number;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  type: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
