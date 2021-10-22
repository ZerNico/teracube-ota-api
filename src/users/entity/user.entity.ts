import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AutoMap } from '@automapper/classes';
import { IsEnum } from 'class-validator';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @AutoMap()
  @IsEnum(UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => ApiTokenEntity, (entity: ApiTokenEntity) => entity.user, {
    cascade: true,
  })
  apiTokens: ApiTokenEntity[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async compareHash(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
