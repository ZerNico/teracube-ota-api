import { AutoMap } from '@automapper/classes';

export class UpdateDto {
  @AutoMap()
  id: string;

  @AutoMap()
  filename: string;

  @AutoMap()
  url: string;

  @AutoMap()
  timestamp: number;

  @AutoMap()
  version: string;

  @AutoMap()
  size: number;

  @AutoMap()
  type: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
