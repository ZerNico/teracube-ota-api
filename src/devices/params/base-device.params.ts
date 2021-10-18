import { IsString } from 'class-validator';

export class BaseDeviceParams {
  @IsString()
  codename: string;
}
