import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from '../client/dto/send-message.dto';
import { ReplyMessageDto } from '../developer/dto/reply-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Client sends message
  @Post('client/:conversationId')
  async sendClientMessage(
    @Param('conversationId') conversationId: string,
    @Body() dto: SendMessageDto,
  ) {
    return await this.messagesService.sendClientMessage(dto, conversationId);
  }

  // Developer sends reply
  @Post('developer/:conversationId')
  async sendDeveloperReply(
    @Param('conversationId') conversationId: string,
    @Body() dto: ReplyMessageDto,
  ) {
    return await this.messagesService.sendDeveloperReply(dto, conversationId);
  }

  // Get all messages
  @Get(':conversationId')
  async getMessages(@Param('conversationId') conversationId: string) {
    return await this.messagesService.getMessages(conversationId);
  }
}
