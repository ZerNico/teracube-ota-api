import { IsString } from 'class-validator';

export class DeviceCodenameParams {
  @IsString()
  codename: string;
}
