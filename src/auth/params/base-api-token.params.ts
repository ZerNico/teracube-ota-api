import { IsUUID } from 'class-validator';

export class BaseApiTokenParams {
  @IsUUID()
  id: string;
}
