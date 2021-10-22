import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from '@auth/dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username, password, email } = createUserDto;

    // check if the user exists in the db
    const userInDb = await this.findOne(username);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepo.create({
      username,
      password,
      email,
    });
    await this.userRepo.save(user);
    return user;
  }
}
