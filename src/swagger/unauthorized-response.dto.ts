import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({ example: 401, description: 'HTTP Status Code' })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', description: 'Error message' })
  message: string;
  @ApiProperty({ example: 'Unauthorized', description: 'HTTP Error' })
  error: string;
}
