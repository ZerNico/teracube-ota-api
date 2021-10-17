import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({ example: 404, description: 'HTTP Status Code' })
  statusCode: number;
  @ApiProperty({ example: 'Not Found', description: 'Error message' })
  message: string;
}
