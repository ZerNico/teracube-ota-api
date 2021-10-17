import { IsUUID } from 'class-validator';

export class RemoveUpdateParams {
  @IsUUID()
  id: string;
}
