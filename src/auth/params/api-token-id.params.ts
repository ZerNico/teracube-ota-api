import { IsUUID } from 'class-validator';

export class ApiTokenIdParams {
  @IsUUID()
  id: string;
}
