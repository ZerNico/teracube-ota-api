import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { UpdateEntity } from '@updates/entity/update.entity';

@Entity('device')
export class DeviceEntity {
  @AutoMap()
  @PrimaryColumn({ nullable: false, unique: true })
  codename: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(() => UpdateEntity, (entity: UpdateEntity) => entity.device, {
    cascade: true,
  })
  updates: UpdateEntity[];

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
