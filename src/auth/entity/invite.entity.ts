import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('invites')
export class InviteEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
