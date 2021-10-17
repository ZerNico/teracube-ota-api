import { IsUUID } from 'class-validator';

export class BaseUpdateParams {
  @IsUUID()
  id: string;
}
