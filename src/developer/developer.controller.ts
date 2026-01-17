import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { ReplyMessageDto } from './dto/reply-message.dto';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly messagesService: MessagesService) {}

  // View all conversations (client aliases + summaries)
  @Get('conversations')
  async getDeveloperView() {
    return await this.messagesService.getDeveloperView();
  }

  // Send a reply to a conversation
  @Post('conversations/:id/reply')
  async sendReply(
    @Param('id') id: string,
    @Body() body: ReplyMessageDto,
  ) {
    return await this.messagesService.sendDeveloperReply(body, id);
  }
}

