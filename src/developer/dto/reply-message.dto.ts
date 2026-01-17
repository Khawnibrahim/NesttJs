import { ApiProperty } from '@nestjs/swagger';

export class ReplyMessageDto {
  @ApiProperty()
  message!: string;
}
