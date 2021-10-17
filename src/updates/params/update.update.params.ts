import { IsUUID } from 'class-validator';

export class UpdateUpdateParams {
  @IsUUID()
  id: string;
}
