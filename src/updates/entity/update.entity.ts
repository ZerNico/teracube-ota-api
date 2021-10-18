import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { DeviceEntity } from '@devices/entity/device.entity';

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

  @ManyToOne(() => DeviceEntity, (entity: DeviceEntity) => entity.codename, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'codename' })
  device: DeviceEntity;

  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  codename: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
