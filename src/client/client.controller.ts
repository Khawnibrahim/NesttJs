import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';

@Controller('client')
export class ClientController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id/messages')
  async getMessages(@Param('id') id: string) {
    return await this.messagesService.getMessages(id);
  }
}

