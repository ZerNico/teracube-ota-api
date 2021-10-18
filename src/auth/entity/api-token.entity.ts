import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { UserEntity } from '@users/entity/user.entity';

@Entity('api_token')
export class ApiTokenEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  token: string;

  @ManyToOne(() => UserEntity, (entity: UserEntity) => entity.apiTokens, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'user_id',
  })
  userId: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
