import { IsUUID } from 'class-validator';

export class UsersIdParams {
  @IsUUID()
  id: string;
}
