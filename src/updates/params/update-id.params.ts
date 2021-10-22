import { IsUUID } from 'class-validator';

export class UpdateIdParams {
  @IsUUID()
  id: string;
}
