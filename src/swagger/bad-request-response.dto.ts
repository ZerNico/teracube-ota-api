import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({ example: 400, description: 'HTTP Status Code' })
  statusCode: number;
  @ApiProperty({ example: 'Bad Request', description: 'Error message' })
  message: string;
}
