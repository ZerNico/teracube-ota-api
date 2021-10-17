import { IsUUID } from 'class-validator';

export class FindOneUpdateParams {
  @IsUUID()
  id: string;
}
